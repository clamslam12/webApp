//instantiate express router
const router = require("express").Router(),
  usersController = require("../controllers/usersController"),
  homeController = require("../controllers/homeController");

// Namespace for /mypost
router.delete(
  "/:id",
  homeController.trendingHashtags,
  homeController.delete,
  homeController.profile
);

//add router to module.exports
module.exports = router;
