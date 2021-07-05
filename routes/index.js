const express = require("express");

const router = express.Router();
const userRouter = require("./users");

const indexController = require("../controllers/index");
const authrouter = require("../controllers/authentication.js");
/* GET CONTROLLER */
//router.use("/", authrouter);
router.get("/", indexController.indexView);
router.get("/saathi-club", indexController.aboutView);

//= ==================================== DECLARE ALL YOUR ROUTERS HERE ==================================

router.use("/users", userRouter);

module.exports = router;
