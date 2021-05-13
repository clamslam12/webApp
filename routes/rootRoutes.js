//instantiate express router
const router = require("express").Router(),
  usersController = require("../controllers/usersController"),
  homeController = require("../controllers/homeController");

// Namespace for /
router.get("/", homeController.trendingHashtags, homeController.getAboutPage);

//add router to module.exports
module.exports = router;
