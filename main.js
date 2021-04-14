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

//Middlewares; middlewares are invoked in the order they are defined
router.use(layouts);
//makes public folder static (serve static files); Dont have to include /public when referencing css/js/images
router.use(express.static("public"));
router.use(
  express.urlencoded({
    extended: false,
  })
);
router.use(express.json());

// router.use(
//   methodOverride("_method", {
//     methods: ["POST", "GET"]
//   })
// );

// router.use(cookieParser("secret_passcode"));
// router.use(
//   expressSession({
//     secret: "secret_passcode",
//     cookie: {
//       maxAge: 4000000
//     },
//     resave: false,
//     saveUninitialized: false
//   })
// );

// router.use(passport.initialize());
// router.use(passport.session());
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// router.use(connectFlash());

// router.use((req, res, next) => {
  // res.locals.loggedIn = req.isAuthenticated();
  // res.locals.currentUser = req.user;
  // res.locals.flashMessages = req.flash();
  // next();
// });


router.use(homeController.logRequestPaths);

//Routers and their middlewares (their callback functions)
router.get("/signup", usersController.getSignUpPage);
router.post("/signup", usersController.saveUser);
router.get("/login", usersController.getSigninPage);
router.post("/login", usersController.authenticateUser);
router.get("/", homeController.index, homeController.indexView);
// router.get("/message", homeController.getMessagePage);
// router.get("/", homeController.getWelcomePage);

//Error handling middlewares
router.use(errorController.logErrors);
router.use(errorController.pageNotFound);
router.use(errorController.serverError);

app.use("/", router);
//starting server
app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
});
