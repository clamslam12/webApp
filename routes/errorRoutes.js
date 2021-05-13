//Instantiate express router
const router = require("express").Router(),
  errorController = require("../controllers/errorController");
//Namespace for "/" errors
router.use(errorController.pageNotFound);
router.use(errorController.logErrors);
router.use(errorController.serverError);

//add router to module.exports
module.exports = router;
