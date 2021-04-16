"use strict";

const mongoose = require("mongoose"),
  User = require("./user"),
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
      lowercase: true,
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
    // numOfFollowing : {
    //   type: Number,
    //   default: 0,
    // },
    // numOfFollower: {
    //   type: Number,
    //   default: 0,
    // },
    following: [],
    follower: [],
    numberOfPosts: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
//virtual methods are computed; not save on database
userSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

userSchema.virtual("numOfFollowing").get(function () {
  return this.following.length;
});

userSchema.virtual("numOfFollower").get(function () {
  return this.follower.length;
});
//causes email to be unique; passport uses this field to authenticate 
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} + ${this.name.last}`;
})
//aply schema to model "User
module.exports = mongoose.model("User", userSchema);
