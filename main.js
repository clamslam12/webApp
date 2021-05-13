"use strict";

const express = require("express"),
  app = express(),
  router = require("./routes/index"),
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
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/iMedia",
  {
    useNewUrlParser: true,
  }
);
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

//Middlewares; middlewares are invoked in the order they are defined
//Global middlewares .use(); invokes on every request
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(layouts);
//makes public folder static (serve static files); Dont have to include /public when referencing css/js/images
app.use(express.static("public"));
app.use(express.json());

//use session management through cookies
app.use(cookieParser("iMedia_passcode"));
app.use(
  expressSession({
    secret: "iMedia_passcode",
    cookie: {
      maxAge: 1800000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
//express validator setup
app.use(expressValidator());
//connect flash messages setup
app.use(connectFlash());
//Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//save flash messages from req.flash(), set loggedIn flag/var, and set current user
//used on every request
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash(); //key/value pairs
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.user = req.user;
  // res.locals.other = req.other;
  // console.log(`Get herer ${req.user}`)
  next();
});
app.use(homeController.logRequestPaths);
//if user is not logged in and use other routes, it will render about page
//if user exits page then revisits any routes AND session not expired, the nav bar will not show sign up/log in options
app.use(homeController.checkSession);

//Routers and their middlewares (their callback functions)

// router.get("/message", homeController.getMessagePage);
// router.get(
//   "/",
// homeController.checkSession,
// homeController.index,
// homeController.indexView
// );

// router.get("/", homeController.index, homeController.indexView);

app.use("/", router);
app.use(errorController.pageNotFound);
app.use(errorController.serverError);

//starting server
app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
});
