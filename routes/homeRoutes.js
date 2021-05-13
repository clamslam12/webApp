//instantiate express router
const router = require("express").Router(),
  usersController = require("../controllers/usersController"),
  homeController = require("../controllers/homeController");

// Namespace for /home
router.get(
  "/",
  homeController.trendingHashtags,
  homeController.index,
  homeController.indexView
);
router.post(
  "/",
  homeController.createPost,
  homeController.trendingHashtags,
  homeController.index,
  homeController.indexView
);
router.get(
  "/:id",
  homeController.visit,
  homeController.trendingHashtags,
  homeController.index,
  homeController.showOther
);
router.put(
  "/:id",
  homeController.trendingHashtags,
  homeController.follow,
  homeController.redirectView
);

//add router to module.exports
module.exports = router;
