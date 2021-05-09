//defines all namespaces
//glues all routes together
const router = require("express").Router(),
  errorRoutes = require("./errorRoutes");

router.use("/", errorRoutes);

//add router to module.exports
module.exports = router;
