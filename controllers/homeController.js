"use strict";

module.exports = {
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  },
  getWelcomePage: (req, res) => {
    let userLoggedIn = res.locals.loggedIn;
    if (userLoggedIn) {
      res.redirect("/home");
    } else {
      res.render("welcome", { layout: "layout" });
    }
  },
  getHomePage: (req, res) => {
    res.render("home", { layout: "mainLayout" });
  },
  getMessagePage: (req, res) => {
    res.render("message", { layout: "mainLayout" });
  },
};
