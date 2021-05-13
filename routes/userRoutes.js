//instantiate express router
const router = require("express").Router(),
usersController = require('../controllers/usersController'),
homeController = require('../controllers/homeController');

// Namespace for /users
router.get("/new", usersController.getSignUpPage);
router.post(
  "/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);
router.get("/:id/edit", homeController.trendingHashtags, usersController.edit);
router.put(
  "/:id/update",
  usersController.updateValidate,
  usersController.checkChangePassword,
  usersController.update,
  usersController.redirectView
);
router.delete(
  "/:id/delete",
  usersController.delete,
  usersController.redirectView
);

//add router to module.exports
module.exports = router;