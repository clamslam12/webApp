"use strict";

const mongoose = require("mongoose"),

  {Schema} = mongoose,
  passportLocalMongoose = require("passport-local-mongoose"),
  userSchema = new Schema({
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
  posts: [{ type: Schema.Types.ObjectId, ref:"Post"}],
});

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} + ${this.name.last}`;
})
//aply schema to model "User
module.exports = mongoose.model("User", userSchema);
