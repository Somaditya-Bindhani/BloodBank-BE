//login
//signup
//token generation
const express = require("express");
const { body } = require("express-validator");
const router = express.Router({ mergeParams: true });
const { login, createSuperAdmin } = require("../controllers/authControllers");
const orgAdminController = require("../controllers/orgAdminContollers");
const checkInvalidInput = require("../middlewares/invalidPost");

// route to create super admin only for devlopment
router.post("/create-super-admin", createSuperAdmin);

router.post(
  "/login",
  [body("email").notEmpty(), body("password").isLength({ min: "6" })],
  checkInvalidInput.checkError,
  login
);

router.put(
  "/resetPassword",
  [body("email").notEmpty()],
  checkInvalidInput.checkError,
  orgAdminController.orgAdminPassReset
);

module.exports = router;
