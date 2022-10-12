//create
//linkOrg
//activate org admin

const express = require("express");
const { body } = require("express-validator");
const router = express.Router({ mergeParams: true });
const orgAdminController = require("../controllers/orgAdminContollers");
const checkInvalidInput = require("../middlewares/invalidPost");

router.post(
  "/createOrgAdmin",
  [body("email").notEmpty()],
  checkInvalidInput.checkError,
  orgAdminController.createOrgAdmin
);

router.put(
  "/resetPassword",
  [body("email").notEmpty()],
  checkInvalidInput.checkError,
  orgAdminController.orgAdminPassReset
);

router.post(
  "/linkOrgAdmin",
  [
    body("orgAdminId").notEmpty().isMongoId(),
    body("orgId").notEmpty().isMongoId(),
  ],
  checkInvalidInput.checkError,
  orgAdminController.linkOrgAdmin
);

router.post(
  "/activateOrgAdmin",
  [body("orgAdminId").notEmpty().isMongoId()],
  checkInvalidInput.checkError,
  orgAdminController.activateOrgAdmin
);

module.exports = router;
