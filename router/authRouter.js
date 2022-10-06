//login
//signup
//token generation
const express = require("express");
const { body } = require("express-validator");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/authControllers");
const checkInvalidInput = require("../middlewares/invalidPost");

router.post(
  "/login",
  [body("email").notEmpty(), body("password").isLength({ min: "6" })],
  checkInvalidInput.checkError,
  authController.login
);

module.exports = router;
