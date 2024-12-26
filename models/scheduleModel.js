const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  employees:{
    type:Array,
    required:true
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  comment: { type: String, maxlength: 200 },
  createdBy: { type:Array, required: true }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;