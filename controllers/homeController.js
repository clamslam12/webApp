"use strict";

exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
};
exports.getWelcomePage = (req, res) => {
  res.render("welcome" , {layout: 'layout'});
};

exports.getHomePage = (req, res) => {
  res.render("home", {layout: 'mainLayout'})
}

exports.getMessagePage = (req, res) => {
  res.render("message", {layout: 'mainLayout'})
}