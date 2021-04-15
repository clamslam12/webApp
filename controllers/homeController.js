"use strict";

module.exports = {
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  },
  getWelcomePage: (req, res) => {
    res.render("welcome", { layout: "layout" });
  },
  getHomePage: (req, res) => {
    res.render("home", { layout: "mainLayout" });
  },
  getMessagePage: (req, res) => {
    res.render("message", { layout: "mainLayout" });
  },
};
