//create
//linkOrg
//activate org admin

const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router({ mergeParams: true });
const orgAdminController = require("../controllers/orgAdminContollers");
const checkInvalidInput = require("../middlewares/invalidPost");
const verifier = require("../middlewares/verifier");

router.get(
  "/getWorkspace/:orgAdminId",
  orgAdminController.getOrgAdminWorkspace
);

router.post(
  "/createOrgAdmin/:orgId",
  [
    body("email").notEmpty(),
    body("password").notEmpty().isLength({ min: 7 }),
    param("orgId").notEmpty().isMongoId(),
  ],
  checkInvalidInput.checkError,
  orgAdminController.createOrgAdmin
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
router.put(
  "/resetPassword",
  [body("email").notEmpty(), body("password").notEmpty().isLength({ min: 7 })],
  checkInvalidInput.checkError,
  orgAdminController.orgAdminPassReset
);

module.exports = router;
