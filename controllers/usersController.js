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
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        //convert Date object to year-month-day format string
        let year = user.dateOfBirth.getFullYear();
        let month = ("0" + (user.dateOfBirth.getMonth() + 1)).slice(-2);
        let day = ("0" + user.dateOfBirth.getDate()).slice(-2);
        let userDob = year + "-" + month + "-" + day;
        console.log(userDob, typeof userDob);
        //save result to res.locals object
        res.locals.userDob = userDob;
        res.locals.user = user;
        res.render("users/editAccount", { layout: "editAccountLayout" });
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
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
    //server-side account create validation
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
        "confirmPassword",
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
        res.locals.redirect = `/users/${req.params.id}/edit`;
        next();
      } else if (req.body.password != req.body.confirmPassword) {
        req.flash("error", "Passwords do not match");
        req.skip = true;
        res.locals.redirect = `/users/${req.params.id}/edit`;
        next();
      } else {
        next();
      }
    });
  },
  updateValidate: (req, res, next) => {
    //server-side account update validation
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
        "oldPassword",
        "newPassword",
        "confirmNewPassword",
        "securityResponse",
      ])
      .trim();
    req.sanitizeBody("bio");
    req.check("email", "email is not valid").isEmail().notEmpty();
    req.check("firstName", "First name is required").notEmpty();
    req.check("lastName", "Last name is required").notEmpty();
    req.check("dob", "Date of birth is required").notEmpty();
    req.check("userName", "User name is required").notEmpty();
    //returns a promise
    req.getValidationResult().then((error) => {
      //if validation fails
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.flash("error", messages.join(" and "));
        req.skip = true;
        res.locals.redirect = `/users/${req.params.id}/edit`;
        next();
      } else if (req.body.newPassword != req.body.confirmNewPassword) {
        req.flash("error", "New passwords do not match");
        req.skip = true;
        res.locals.redirect = `/users/${req.params.id}/edit`;
        next();
      } else if (
        req.body.oldPassword != "" &&
        req.body.newPassword != "" &&
        req.body.confirmPassword != "" &&
        req.body.newPassword == req.body.confirmNewPassword
      ) {
        req.changePass = true;
        next();
      } else {
        next();
      }
    });
  },
  checkChangePassword: (req, res, next) => {
    if (req.changePass && req.user) {
      req.user.changePassword(
        req.body.oldPassword,
        req.body.newPassword,
        function (error) {
          if (error) {
            req.flash("error", `${error.message}`);
            res.locals.redirect = `/users/${req.params.id}/edit`;
            req.skip = true;
            console.log(error);
            next();
          } else {
            next();
          }
        }
      );
    } else {
      next();
    }
  },
  update: (req, res, next) => {
    if (req.skip) return next();
    let userId = req.params.id;
    let updatedUser = {
      name: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      location: req.body.location,
      gender: req.body.gender,
      dateOfBirth: req.body.dob,
      userName: req.body.userName,
      email: req.body.email,
      securityQuestion: req.body.securityQuestion,
      securityResponse: req.body.securityResponse,
      bio: req.body.bio,
    };
    User.findByIdAndUpdate(userId, updatedUser)
      .then((user) => {
        res.locals.user = user;
        req.flash("success", "You have successfully updated your account!");
        res.locals.redirect = `/users/${user._id}/edit`;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  getSigninPage: (req, res) => {
    res.render("./users/login", { layout: "layout" });
  },
  authenticate: passport.authenticate("local", {
    successFlash: "Sucessfully logged in!",
    successRedirect: "/home",
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
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        req.flash("success", "Your account have sucessfully been deleted!");
        res.locals.redirect = "/";
        next();
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
  },
};
