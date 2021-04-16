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
    fullName: "test",
  },
  {
    post: "A new post",
    userEmail: "charlie@angel.com",
    userName: "cangel",
    fullName: "test",
  },
  {
    post: "A new post",
    userEmail: "charlie@angel.com",
    userName: "cangel",
    fullName: "test",
  },
  {
    post: "A new post",
    userEmail: "charlie@angel.com",
    userName: "cangel",
    fullName: "test",
  },
  {
    post: "A new post",
    userEmail: "charlie@angel.com",
    userName: "cangel",
    fullName: "test",
  },
  {
    post: "A new post",
    userEmail: "charlie@angel.com",
    userName: "cangel",
    fullName: "test",
  },
  {
    post: "A new post",
    userEmail: "charlie@angel.com",
    userName: "cangel",
    fullName: "test",
  },
];

let users = [
<<<<<<< HEAD
  { 
    name:{
    firstName: "Jon",
    lastName: "Wexler",
    },
=======
  {
    name: { firstName: "Jon", lastName: "Wexler" },
>>>>>>> 86326ca5c3f07c9087162a5533b46077f96843b5
    location: "Seattle",
    gender: "male",
    dateOfBirth: "1970-03-01",
    email: "jon@wexler.com",
    userName: "jwexler",
    password: "Jon12",
    securityQuestion: "nickName",
    securityResponse: "jonw",
    bio: "Hello this is jon wexler bio",
  },
  {
<<<<<<< HEAD
    name: {
    firstName: "Charlie",
    lastName: "Angel",
    },
=======
    name: { firstName: "Charlie", lastName: "Angel" },
>>>>>>> 86326ca5c3f07c9087162a5533b46077f96843b5
    location: "Los Angeles",
    gender: "female",
    dateOfBirth: "1999-09-23",
    email: "charlie@angel.com",
    userName: "cangel",
    password: "Charlie23",
    securityQuestion: "motherMaiden",
    securityResponse: "mom",
    bio: "Hello this is charlie angel bio",
  },
<<<<<<< HEAD
  { 
    name: {
    firstName: "Elvis",
    lastName: "John",
    },
=======
  {
    name: { firstName: "Elvis", lastName: "John" },
>>>>>>> 86326ca5c3f07c9087162a5533b46077f96843b5
    location: "Austin",
    gender: "male",
    dateOfBirth: "2020-12-29",
    email: "elvis@john.com",
    userName: "ejohn",
    password: "Elvis29",
    securityQuestion: "mascot",
    securityResponse: "tigers",
    bio: "Hello this is elvis john bio",
  },
];

//delete all documents in a collection
User.deleteMany()
  .exec()
  .then(() => {
    console.log("Users data is empty!");
  });

let commands = [];
//for each user, push User.create commands in commands array
//User.create is async
users.forEach((u) => {
  let newUser = new User(u);
  commands.push(
<<<<<<< HEAD
    User.create({
      name: u.name,
      location: u.location,
      gender: u.gender,
      dateOfBirth: u.dateOfBirth,
      email: u.email,
      userName: u.userName,
      password: u.password,
      confirmPassword: u.confirmPassword,
      securityQuestion: u.securityQuestion,
      securityResponse: u.securityResponse,
      bio: u.bio
    })
=======
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
>>>>>>> 86326ca5c3f07c9087162a5533b46077f96843b5
  );
});

posts.forEach((post) => {
  commands.push(
    Post.create({
      post: post.post,
      userEmail: post.userEmail,
      userName: post.userName,
      fullName: post.fullName,
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
