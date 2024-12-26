const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true,},
  password: { type: String, required: true,uinque:true},
  email:{type:String,required:true,unique:true},
  role: { type: String, enum: ["Admin", "User"], required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;