//defines all namespaces
//glues all routes together
const router = require("express").Router(),
  errorRoutes = require("./errorRoutes"),
  userRoutes = require("./userRoutes"),
  loginRoutes = require("./loginRoutes"),
  homeRoutes = require("./homeRoutes"),
  logoutRoutes = require("./logoutRoutes"),
  aboutRoutes = require("./aboutRoutes"),
  postRoutes = require("./postRoutes"),
  exploreRoutes = require("./exploreRoutes"),
  profileRoutes = require("./profileRoutes"),
  mypostRoutes = require("./mypostRoutes.js"),
  notificationRoutes = require("./notificationRoutes"),
  rootRoutes = require("./rootRoutes"),
  homeController = require("../controllers/homeController");

//for more specific routes
router.use("/users", userRoutes);
router.use("/login", loginRoutes);
router.use("/home", homeRoutes);
router.use("/logout", logoutRoutes);
router.use("/about", aboutRoutes);
router.use("/post", postRoutes);
router.use("/explore", exploreRoutes);
router.use("/profile", profileRoutes);
router.use("/mypost", mypostRoutes);
router.use("/notification", notificationRoutes);

//for all routes
//must be defined last because if a specific route is requested, that request will go through the root route "/" first.
router.use("/", rootRoutes);
router.use("/", errorRoutes);

//add router to module.exports
module.exports = router;
