//instantiate express router
const router = require("express").Router(),
  usersController = require("../controllers/usersController"),
  homeController = require("../controllers/homeController");

// Namespace for /logout
router.get(
  "/",
  homeController.trendingHashtags,
  usersController.logout,
  usersController.redirectView
);

//add router to module.exports
module.exports = router;
