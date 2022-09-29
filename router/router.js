const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/authControllers");
const checkInvalidInput = require("../middlewares/invalidPost");

router.post(
  "/login",
  [body("email").notEmpty(), body("password").isLength({ min: "6" })],
  checkInvalidInput.checkError,
  authController.login
);
router.post(
  "/createOrgAdmin",
  [body("email").notEmpty()],
  checkInvalidInput.checkError,
  authController.createOrgAdmin
);

router.post(
  "/createOrganization",
  [
    body("name").notEmpty(),
    body("address").notEmpty(),
    body("state").notEmpty(),
    body("city").notEmpty(),
    body("PIN").isNumeric().isLength({ min: 6, max: 6 }),
    body("contactNumber").isNumeric().isLength({ min: 10, max: 10 }),
  ],
  checkInvalidInput.checkError,
  authController.createOrganization
);
router.post(
  "/linkOrgAdmin",
  [
    body("orgAdminId").notEmpty().isMongoId(),
    body("orgId").notEmpty().isMongoId()
  ],
  checkInvalidInput.checkError,
  authController.linkOrgAdmin
);
router.post(
  "/activateOrgAdmin",
  [
    body("orgAdminId").notEmpty().isMongoId(),
  ],
  checkInvalidInput.checkError,
  authController.activateOrgAdmin
);

module.exports = router;
