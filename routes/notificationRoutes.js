//instantiate express router
const router = require("express").Router(),
  usersController = require("../controllers/usersController"),
  homeController = require("../controllers/homeController");

// Namespace for /notification

router.get("/", homeController.trendingHashtags, homeController.notification);

//add router to module.exports
module.exports = router;
