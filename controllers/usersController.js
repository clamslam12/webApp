"use strict";

//using Promises;
//
//exec() returns a promise that resolves with data or rejects with error
//.then() = resolve(), .catch() = reject(); if .catch() or promise rejected, any .then() after will not be invoked

//instantiate a User model
const User = require("../models/user");

//save user to database
exports.saveUser = (req, res) => {
  //server-side validation
  if (
    req.body.firstName == "" ||
    req.body.lastName == "" ||
    req.body.dob == "" ||
    req.body.userName == "" ||
    req.body.password == "" ||
    req.body.confirmPassword == "" ||
    req.body.password != req.body.confirmPassword
  ) {
    res.render("signup", {
      noError: true,
      formValidationOk: false,
      invalidMessage:
        "Must have valid first/last name, DoB, username, and matching passwords. Please correct and resubmit",
    });
    return;
  }
  //instantiate an object of type User
  let newUser = new User({
    //we can initialize the values with req.body.xxx because of using express.json() in main.js
    //.xxx comes from the value of "name" attribute of an html element in body element
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    location: req.body.location,
    gender: req.body.gender,
    dateOfBirth: req.body.dob,
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    securityQuestion: req.body.securityQuestion,
    securityResponse: req.body.securityResponse,
    bio: req.body.bio,
  });
  newUser
    //save() returns a promise that resolves with result or rejects with error
    .save()
    .then((result) => {
      res.render("success");
    })
    .catch((error) => {
      res.render("signup", {
        noError: false,
        errorM: error,
        formValidationOk: true,
      });
    });
};

exports.getSignUpPage = (req, res) => {
  res.render("signup", {
    layout: "layout",
    noError: true,
    formValidationOk: true,
  });
};
exports.getSigninPage = (req, res) => {
  res.render("login", { layout: "layout", loginOk: true });
};
exports.authenticateUser = (req, res) => {
  //resolves with object if found, else resolves with null
  User.findOne({
    email: req.body.email,
    password: req.body.password,
  })

    .then((users) => {
      console.log("result", users);
      if (users != null) {
        res.render("home", { layout: "mainLayout", user: users });
      } else {
        res.render("login", {
          loginOk: false,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return [];
    })
    .then(() => {
      console.log("promise chain complete");
    });
};
