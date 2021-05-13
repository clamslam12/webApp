//instantiate express router
const router = require("express").Router(),
  usersController = require("../controllers/usersController"),
  homeController = require("../controllers/homeController");

// Namespace for /profile

router.get("/me", homeController.trendingHashtags, homeController.profile);

//add router to module.exports
module.exports = router;
