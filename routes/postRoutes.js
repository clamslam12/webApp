//instantiate express router
const router = require("express").Router(),
  usersController = require("../controllers/usersController"),
  homeController = require("../controllers/homeController");

// Namespace for /post
router.delete(
  "/:id",
  homeController.trendingHashtags,
  homeController.delete,
  homeController.index,
  homeController.indexView
);

//add router to module.exports
module.exports = router;
