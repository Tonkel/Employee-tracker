//set up router
const router = require("express").Router();

//add route
const apiRoutes = require("./api");

//use api folder for any routes that have /api
router.use("/api", apiRoutes);

//export
module.exports = router;
