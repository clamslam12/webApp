"use strict";

const httpStatus = require("http-status-codes");
//log errors
exports.logErrors = (error, req, res, next) => {
  console.log('error detected', error.stack);
  next(error);
};
//404 error
exports.pageNotFound = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.render("error", {errorCode: errorCode });
};
//500 error
exports.serverError = (error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  res.status(errorCode);
  res.render("error", {errorCode: errorCode });
  console.log(error.stack);
};
