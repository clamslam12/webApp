//instantiate express router
const router = require("express").Router(),
  usersController = require("../controllers/usersController"),
  homeController = require("../controllers/homeController");

// Namespace for /explore

router.get("/", homeController.trendingHashtags, homeController.explore);
router.put(
  "/:id",
  homeController.trendingHashtags,
  homeController.follow,
  homeController.redirectView
);

//add router to module.exports
module.exports = router;
