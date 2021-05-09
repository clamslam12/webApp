//Instantiate express router
const router = require("express").Router(),
  errorController = require("../controllers/errorController");
//Namespace for / errors
router.use(errorController.pageNotFound);
router.use(errorController.serverError);
router.use(errorController.logErrors);

//add router to module.exports
module.exports = router;
