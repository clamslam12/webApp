//instantiate express router
const router = require("express").Router(),
usersController = require('../controllers/usersController');

// Namespace for /login
router.get("/", usersController.getSigninPage);
router.post(
  "/",
  usersController.authenticate,
  usersController.redirectView
);

//add router to module.exports
module.exports = router;
