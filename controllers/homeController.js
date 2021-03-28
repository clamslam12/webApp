"use strict";

exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
};
exports.getWelcomePage = (req, res) => {
  res.render("welcome");
};
