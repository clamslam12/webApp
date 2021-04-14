"use strict";

const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose"),
  { Schema } = mongoose;
//define a schema
const userSchema = new Schema(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    location: {
      type: String,
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    //dont need password due to using Passport
    securityQuestion: {
      type: String,
    },
    securityResponse: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);
//virtual methods are computed; not save on database
userSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});
userSchema.plugin(passportLocalMongoose, {
  usernameField: "userName",
});
//aply schema to model "User
module.exports = mongoose.model("User", userSchema);
