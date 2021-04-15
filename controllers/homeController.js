"use strict";

// module.exports = {
//   logRequestPaths: (req, res, next) => {
//     console.log(`request made to: ${req.url}`);
//     next();
//   },
//   getWelcomePage: (req, res) => {
//     res.render("welcome", { layout: "layout" });
//   },
//   getHomePage: (req, res) => {
//     res.render("homePage/index", { layout: "mainLayout" });
//   },
//   getMessagePage: (req, res) => {
//     res.render("message", { layout: "mainLayout" });
//   },
// };
const Post = require("../models/post");

module.exports = {
  checkSession: (req, res, next) => {
    let userLoggedIn = res.locals.loggedIn;
    if (userLoggedIn) {
      return next();
    } else {
      res.redirect("/about");
    }
  },
  index: (req, res, next) => {
    Post.find()
      .then((posts) => {
        res.locals.posts = posts.reverse();
        next();
      })
      .catch((error) => {
        console.log(`Error fetching posts: ${error.message}`);
      });
  },
  indexView: (req, res) => {
    res.render("homePage/index", { layout: "mainLayout" });
  },
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  },
  getAboutPage: (req, res, next) => {
    res.render("about", { layout: "layout" });
  },
};
