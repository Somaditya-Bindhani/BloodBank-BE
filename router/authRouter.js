//login
//signup
//token generation
const express = require("express");
const { body } = require("express-validator");
const router = express.Router({ mergeParams: true });
const { login } = require("../controllers/authControllers");
const checkInvalidInput = require("../middlewares/invalidPost");

// route to create super admin only for devlopment
// router.get("/create-super-admin", signup);

router.post(
  "/login",
  [body("email").notEmpty(), body("password").isLength({ min: "6" })],
  checkInvalidInput.checkError,
  login
);

module.exports = router;
