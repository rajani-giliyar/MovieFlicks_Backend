const express = require("express");
const router = express.Router();

// // import login_controller
const loginController = require("../controllers/user_controller")

// fetch

router.post("/register",loginController.register);

router.post("/login",loginController.login);


module.exports = router;