"use strict";

const Post = require("../models/post");
const User = require("../models/user");
const Hashtag = require("../models/hashtag");

module.exports = {
  checkSession: (req, res, next) => {
    if (!res.locals.loggedIn && !res.locals.user) {
      console.log(req.url);
      if (req.url == "/login" || req.url == "/users/new") {
        next();
      } else if (req.url == "/home") {
        req.flash("error", "You must log in first!");
        res.redirect("/login");
      } else {
        res.render("about");
      }
    } else {
      next();
    }
  },
  index: (req, res, next) => {
    Post.find()
      .then((posts) => {
        res.locals.posts = posts.reverse();
        res.locals.user = req.user;
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
  createPost: (req, res, next) => {
    // let user = req.locals.user;
    // console.log(`User ${req.locals.user.userEmail}`)
    let newPost = {
      post: req.body.newPost,
      userName: req.user.userName,
      userEmail: req.user.email,
      fullName: req.user.fullName,
    };
    Post.create(newPost)
      .then(() => {
        // res.locals.redirect = "/home";
        // next();
      })
      .catch((error) => {
        console.log(`Error create new post: ${error.message}`);
      });
    let words = newPost.post.split(" ");
    let hashtags = words.filter((word) => word[0] == "#");
    if (hashtags.length != 0) {
      hashtags.forEach((tag) => {
        Hashtag.findOne({ word: tag }, function (err, result) {
          if (result) {
            let updateTag = result;
            updateTag.count += 1;
            Hashtag.findByIdAndUpdate(result._id, { $set: updateTag }).catch(
              (error) => {
                console.log(`Cannot update tag ${error.message}`);
              }
            );
          } else {
            let newTag = {
              word: tag,
            };
            Hashtag.create(newTag);
          }
        }).catch((error) => {
          console.log(`Cannot create tag ${error.message}`);
        });
      });
    }
    let myEmail = req.user.email;
    User.findOne({ email: myEmail })
      .then((user) => {
        console.log(`15`);
        console.log(user);
        let updateUser = user;
        updateUser.numberOfPosts += 1;
        User.findByIdAndUpdate(user._id, {
          $set: updateUser,
        }).then(() => {
          // res.locals.redirect = `/home/${otherEmail}`;
          next();
        });
      })
      .catch((error) => {
        console.log(`Error to increase post ${error.message}`);
      });
  },
  profile: (req, res, next) => {
    Post.find()
      .then((posts) => {
        let myEmail = req.user.email;
        User.findOne({ email: myEmail }).then((user) => {
          let myPosts = posts.filter((post) => post.userEmail == myEmail);
          res.locals.myPosts = myPosts.reverse();
          res.locals.user = req.user;
          res.render("homePage/profile", { layout: "mainLayout" });
        });
      })
      .catch((error) => {
        console.log(`Error fetching posts: ${error.message}`);
      });
  },
  visit: (req, res, next) => {
    let otherUserEmail = req.params.id;
    console.log(`what is this ${otherUserEmail}`);
    User.findOne({ email: otherUserEmail })
      .then((otherUser) => {
        console.log(otherUser);
        res.locals.otherUser = otherUser;
        // let user = req.user;
        var following = req.user.following.includes(otherUser.email);
        res.locals.following = following;
        next();
      })
      .catch((error) => {
        console.log(`errro ${error.message}`);
        // next(error);
      });
  },
  showOther: (req, res) => {
    res.render("homePage/otherUser", { layout: "mainLayout" });
  },
  follow: (req, res, next) => {
    let otherEmail = req.params.id;
    var userFollowing = req.user.following;
    if (userFollowing.includes(otherEmail)) {
      userFollowing = userFollowing.filter((email) => email !== otherEmail);
    } else {
      userFollowing.push(otherEmail);
    }
    let myEmail = req.user.email;
    User.findOne({ email: myEmail })
      .then((user) => {
        let updateUser = user;
        updateUser.following = userFollowing;
        User.findByIdAndUpdate(user._id, {
          $set: updateUser,
        }).then(() => {
          console.log(req.url.substr(1, 7));
          if (req.url.substr(1, 7) === `explore`) {
            res.locals.redirect = "/explore";
          } else {
            res.locals.redirect = `/home/${otherEmail}`;
          }
          next();
        });
      })
      .catch((error) => {
        console.log(`Error to follow/unfollow ${error.message}`);
      });
  },
  delete: (req, res, next) => {
    let postId = req.params.id;
    Post.findByIdAndRemove(postId).then(() => {
      let myEmail = req.user.email;
      User.findOne({ email: myEmail }).then((user) => {
        console.log(`15`);
        console.log(user);
        let updateUser = user;
        updateUser.numberOfPosts -= 1;
        console.log(user.following);
        console.log(user._id);
        User.findByIdAndUpdate(user._id, {
          $set: updateUser,
        })
          .then(() => {
            // res.locals.redirect = `/home/${otherEmail}`;
            next();
          })
          .catch((error) => {
            console.log(`Error deleting post by ID: ${error.message}`);
            next();
          });
      });
    });
  },
  explore: (req, res) => {
    User.find()
      .then((users) => {
        res.locals.users = users;
        res.locals.user = req.user;
        res.render("homePage/explore", { layout: "mainLayout" });
      })
      .catch((error) => {
        console.log(`Error fetching posts: ${error.message}`);
      });
  },
  notification: (req, res, next) => {
    Post.find()
      .then((posts) => {
        let myEmail = req.user.email;
        User.findOne({ email: myEmail }).then((user) => {
          let following = user.following;
          let followingPosts = posts.filter((post) =>
            following.includes(post.userEmail)
          );
          res.locals.followingPosts = followingPosts.reverse();
          res.locals.user = req.user;
          res.render("homePage/notification", { layout: "mainLayout" });
        });
      })
      .catch((error) => {
        console.log(`Error fetching posts: ${error.message}`);
      });
  },
  trendingHashtags: (req, res, next) => {
    Hashtag.find().then((hashtags) => {
      hashtags.sort((a, b) => b.count - a.count);
      res.locals.hashtags = hashtags;
      next();
    });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
};
