"use strict";

const mongoose = require("mongoose");
//define a schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  location: String,
  gender: String,
  dateOfBirth: String,
  email: String,
  userName: String,
  password: String,
  confirmPassword: String,
  securityQuestion: String,
  securityResponse: String,
  bio: String,
});
//aply schema to model "User
module.exports = mongoose.model("User", userSchema);
