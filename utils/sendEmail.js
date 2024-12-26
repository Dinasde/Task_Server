const nodemailer = require('nodemailer')
const { getMaxListeners } = require('../models/userModel')

const transporter = nodemailer.createTransport({
 service:'gmail',
 auth:{
    user:'dinakarswe@gmail.com',
    pass:'Crore@1234'
 }


})


const sendEmail =(to,subject,text)=>{

    const mailOptions ={
        from:'dinakarswe@gmail.com',
        to,
        subject,
        text
    }

    return transporter.sendMail(mailOptions)

}