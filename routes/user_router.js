const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/user_middleware");

const loginController = require("../controllers/user_controller");

router.post("/register", loginController.register);

router.post("/login", loginController.login);

router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Access granted" });
});

module.exports = router;
