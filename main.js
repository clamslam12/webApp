const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  homeController = require("./controllers/homeController"),
  usersController = require("./controllers/usersController"),
  errorController = require("./controllers/errorController"),
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
app.use(layouts);
//makes public folder static (serve static files); Dont have to include /public when referencing css/js/images
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

//Routers and their middlewares (their callback functions)
app.get("/signup", usersController.getSignUpPage);
app.post("/signup", usersController.saveUser);
app.get("/login", usersController.getSigninPage);
app.post("/login", usersController.authenticateUser);
app.get("/", homeController.getWelcomePage);

//Error handling middlewares
app.use(errorController.logErrors);
app.use(errorController.pageNotFound);
app.use(errorController.serverError);

//starting server
app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
});
