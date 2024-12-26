const Schedule = require('../models/scheduleModel');
const moment = require('moment');
const nodeCron = require('node-cron');
const sendEmail = require('../utils/sendEmail')
const User = require('../models/userModel')



const createSchedule = async (req, res) => {
    const { employees, date, time, comment, createdBy } = req.body;


  
    try {
      const scheduleTime = moment(`${date} ${time}`); // Create a moment object for the scheduled time
  
      const oneHourBefore = scheduleTime.clone().subtract(1, 'hours');
      const thirtyMinutesBefore = scheduleTime.clone().subtract(30, 'minutes');
      const fifteenMinutesBefore = scheduleTime.clone().subtract(15, 'minutes');
  
      // Create a new schedule document
      const newSchedule = new Schedule({ employees, date, time, comment, createdBy });
  
      const result = await newSchedule.save();

   
  
      if (result) {
        // Schedule tasks using node-cron to send emails at the specified intervals
        nodeCron.schedule(oneHourBefore.format('m H D M *'), async () => {
          for (let employee of employees) {
            console.log(employees)
            await sendEmail(employee.email, 'Schedule Reminder', `Your schedule is at ${scheduleTime.format('YYYY-MM-DD HH:mm')}. Comment: ${comment}`);
          }
        });
  
        nodeCron.schedule(thirtyMinutesBefore.format('m H D M *'), async () => {
          for (let employee of employees) {
            await sendEmail(employee.email, 'Schedule Reminder', `Your schedule is in 30 minutes. Comment: ${comment}`);
          }
        });
  
        nodeCron.schedule(fifteenMinutesBefore.format('m H D M *'), async () => {
          for (let employee of employees) {
            await sendEmail(employee.email, 'Schedule Reminder', `Your schedule is in 15 minutes. Comment: ${comment}`);
          }
        });
  
        // After sending the last email, notify the admin
        nodeCron.schedule(fifteenMinutesBefore.format('m H D M *'), async () => {

          for(let admin of createdBy){
            await sendEmail(
              admin.email,
              'Schedule Emails Sent',
              `All reminder emails have been sent to the employees for the schedule on ${scheduleTime.format('YYYY-MM-DD HH:mm')}.`
            );
          }
         
        });
  
        return res.status(200).json({ message: 'Schedule Created Successfully' });
      } else {
        return res.status(400).json({ message: 'Internal Server Error' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };







module.exports = {createSchedule}
