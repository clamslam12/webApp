"use strict";

//using Promises;
//
//exec() returns a promise that resolves with data or rejects with error
//.then() = resolve(), .catch() = reject(); if .catch() or promise rejected, any .then() after will not be invoked

//instantiate a User model
const User = require("../models/user");
const passport = require("passport");
const getUserParams = (body) => {
  return {
    name: {
      firstName: body.firstName,
      lastName: body.lastName,
    },
    location: body.location,
    gender: body.gender,
    dateOfBirth: body.dob,
    email: body.email,
    userName: body.userName,
    password: body.password,
    securityQuestion: body.securityQuestion,
    securityResponse: body.securityResponse,
    bio: body.bio,
  };
};

module.exports = {
  //save user to database
  create: (req, res, next) => {
    //base case; skip create user and goto next middleware
    if (req.skip) return next();

    let userParams = getUserParams(req.body);
    let newUser = new User(userParams);
    //Passport method
    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        req.flash("success", "User account successfully created");
        res.locals.redirect = "/login";
        res.locals.user = user;
        next();
      } else {
        req.flash("error", `Failed to create user account: ${error.message}`);
        res.locals.redirect = "/users/new";
        next();
      }
    });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath != undefined) res.redirect(redirectPath);
    else next();
  },
  getSignUpPage: (req, res) => {
    res.render("./users/signup", {
      layout: "layout",
    });
  },
  validate: (req, res, next) => {
    //server-side validation
    req
      .sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true,
      })
      .trim();
    req
      .sanitizeBody([
        "firstName",
        "lastName",
        "location",
        "gender",
        "userName",
        "password",
        "securityResponse",
      ])
      .trim();
    req.sanitizeBody("bio");
    req.check("email", "email is not valid").isEmail().notEmpty();
    req.check("firstName", "First name is required").notEmpty();
    req.check("lastName", "Last name is required").notEmpty();
    req.check("dob", "Date of birth is required").notEmpty();
    req.check("userName", "User name is required").notEmpty();
    req.check("password", "Password is required").notEmpty();
    req.check("confirmPassword", "Confirm password is required").notEmpty();
    //returns a promise
    req.getValidationResult().then((error) => {
      //if validation fails
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.flash("error", messages.join(" and "));
        req.skip = true;
        res.locals.redirect = "/users/new";
      } else if (req.body.password != req.body.confirmPassword) {
        req.flash("error", "Passwords do not match");
        req.skip = true;
        res.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    });
  },
  getSigninPage: (req, res) => {
    res.render("./users/login", { layout: "layout" });
  },
  authenticate: passport.authenticate("local", {
    successFlash: "Sucessfully logged in!",
    successRedirect: "/",
    failureFlash: "Failed to login. Please try again",
    failureRedirect: "/login",
  }),
  authenticateUser: (req, res) => {
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
  },
};
