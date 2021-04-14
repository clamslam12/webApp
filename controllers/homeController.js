"use strict";

const Post = require("../models/post");

module.exports = {
  index: (req, res, next) => {
    Post.find()
    .then(posts => {
      res.locals.posts = posts.reverse();
      next();
    })
    .catch(error => {
      console.log(`Error fetching posts: ${error.message}`)
    })
  },
  indexView: (req, res) => {
    res.render("homePage/index", {layout: 'mainLayout'});
  },
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  }
}

// exports.logRequestPaths = (req, res, next) => {
//   console.log(`request made to: ${req.url}`);
//   next();
// };
// exports.getWelcomePage = (req, res) => {
//   res.render("welcome" , {layout: 'layout'});
// };

// exports.getHomePage = (req, res) => {
//   res.render("home", {layout: 'mainLayout'})
// }

// exports.getMessagePage = (req, res) => {
//   res.render("message", {layout: 'mainLayout'})
// }