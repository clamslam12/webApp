"use strict";

const { Promise } = require("bluebird");
const mongoose = require("mongoose"),
  User = require("./models/user"),
  Post = require("./models/post"),
  passport = require('passport');

//initiate connection
mongoose.connect("mongodb://localhost:27017/iMedia", {
  useNewUrlParser: true,
});
mongoose.connection;

let posts = [
  {
    post: "This is test post",
    userEmail: "jon@wexler.com",
    userName: "jwexler",
    fullName: "John Wexler"
  },
  {
    post: "How are you",
    userEmail: "charlie@angel.com",
    userName: "cangel",
    fullName: "Charlie Angel"
  },
  {
    post: "What's new",
    userEmail: "jon@wexler.com",
    userName: "jwexler",
    fullName: "John Wexler",
  },
  {
    post: "This is a greate day",
    userEmail: "charlie@angel.com",
    userName: "cangel",
    fullName: "Charlie Angel",
  },
  {
    post: "Just test",
    userEmail: "elvis@john.com",
    userName: "ejohn",
    fullName: "Elvis John"
  },
  {
    post: "Hi",
    userEmail: "charlie@angel.com",
    userName: "cangel",
    fullName: "Charlie Angel",
  },
  {
    post: "Nice",
    userEmail: "elvis@john.com",
    userName: "ejohn",
    fullName: "Elvis John"
  },
];

let users = [
  {
    name: { firstName: "Jon", lastName: "Wexler" },
    location: "Seattle",
    gender: "male",
    dateOfBirth: "1970-03-01",
    email: "jon@wexler.com",
    userName: "jwexler",
    password: "Jon12",
    securityQuestion: "nickName",
    securityResponse: "jonw",
    bio: "Hello this is jon wexler bio",
    numberOfPosts: 2
  },
  {
    name: { firstName: "Charlie", lastName: "Angel" },
    location: "Los Angeles",
    gender: "female",
    dateOfBirth: "1999-09-23",
    email: "charlie@angel.com",
    userName: "cangel",
    password: "Charlie23",
    securityQuestion: "motherMaiden",
    securityResponse: "mom",
    bio: "Hello this is charlie angel bio",
    numberOfPosts: 3
  },
  {
    name: { firstName: "Elvis", lastName: "John" },
    location: "Austin",
    gender: "male",
    dateOfBirth: "2020-12-29",
    email: "elvis@john.com",
    userName: "ejohn",
    password: "Elvis29",
    securityQuestion: "mascot",
    securityResponse: "tigers",
    bio: "Hello this is elvis john bio",
    numberOfPosts: 2

  },
];

//delete all documents in a collection
User.deleteMany()
  .exec()
  .then(() => {
    console.log("Users data is empty!");
  });

Post.deleteMany()
  .exec()
  .then(() => {
    console.log("Post data is empty!");
  });

let commands = [];
//for each user, push User.create commands in commands array
//User.create is async
users.forEach((u) => {
  let newUser = new User(u);
  commands.push(
    // User.create({
    //   firstName: u.firstName,
    //   lastName: u.lastName,
    //   location: u.location,
    //   gender: u.gender,
    //   dateOfBirth: u.dateOfBirth,
    //   email: u.email,
    //   userName: u.userName,
    //   password: u.password,
    //   confirmPassword: u.confirmPassword,
    //   securityQuestion: u.securityQuestion,
    //   securityResponse: u.securityResponse,
    //   bio: u.bio,
    // })
    User.register(newUser, u.password)
  );
});

posts.forEach((post) => {
  commands.push(
    Post.create({
      post: post.post,
      userEmail: post.userEmail,
      userName: post.userName,
      fullName: post.fullName
    })
  );
});

//wait for all promises(async code) to resolve
Promise.all(commands)
  .then((r) => {
    console.log(r); //prints array of User objects
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
