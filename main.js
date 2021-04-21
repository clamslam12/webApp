"use strict";

const express = require("express"),
  app = express(),
  router = express.Router(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  expressValidator = require("express-validator"),
  passport = require("passport"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  usersController = require("./controllers/usersController"),
  User = require("./models/user");

//using Promises with Mongoose
mongoose.Promise = global.Promise;
//initiate connection
mongoose.connect("mongodb://localhost:27017/iMedia", {
  useNewUrlParser: true,
});
mongoose.set("useCreateIndex", true);
//connect to db
const db = mongoose.connection;
//invokes callback once upon receiving an "open" event from the database
//async
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: false,
  })
);

//Middlewares; middlewares are invoked in the order they are defined
router.use(methodOverride("_method", { methods: ["POST", "GET"] }));
router.use(layouts);
//makes public folder static (serve static files); Dont have to include /public when referencing css/js/images
router.use(express.static("public"));
router.use(express.json());

//use session management through cookies
router.use(cookieParser("iMedia_passcode"));
router.use(
  expressSession({
    secret: "iMedia_passcode",
    cookie: {
      maxAge: 360000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
//express validator setup
router.use(expressValidator());
//connect flash messages setup
router.use(connectFlash());
//Passport setup
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//save flash messages from req.flash(), set loggedIn flag/var, and set current user
//used on every request
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash(); //key/value pairs
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.user = req.user;
  // res.locals.other = req.other;
  // console.log(`Get herer ${req.user}`)
  next();
});
router.use(homeController.logRequestPaths);

//Routers and their middlewares (their callback functions)
router.get("/users/new", usersController.getSignUpPage);
router.post(
  "/users/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);
router.get("/login", usersController.getSigninPage);
router.post(
  "/login",
  usersController.authenticate,
  usersController.redirectView
);
router.get("/home", homeController.index, homeController.indexView);
router.get("/logout", usersController.logout, usersController.redirectView);
// router.get("/message", homeController.getMessagePage);
// router.get(
//   "/",
  // homeController.checkSession,
  // homeController.index,
  // homeController.indexView
// );
router.get("/about", homeController.getAboutPage);
router.post("/home", homeController.createPost, homeController.index, homeController.indexView);
router.get("/home/:id", homeController.visit, homeController.index, homeController.showOther);
router.put("/home/:id", homeController.follow, homeController.redirectView);
router.delete("/post/:id", homeController.delete, homeController.index, homeController.indexView);
router.get("/explore", homeController.explore);
router.put("/explore/:id", homeController.follow, homeController.redirectView);

router.get("/profile/me", homeController.profile);


router.get("/", homeController.getAboutPage);

// router.get("/", homeController.index, homeController.indexView);
//Error handling middlewares
router.use(errorController.logErrors);
router.use(errorController.pageNotFound);
router.use(errorController.serverError);

app.use("/", router);
//starting server
app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
});
