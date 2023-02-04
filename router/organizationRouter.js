const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router({ mergeParams: true });
const orgController = require("../controllers/orgControllers");
const checkInvalidInput = require("../middlewares/invalidPost");
const verifier = require("../middlewares/verifier");

router.get("/", orgController.getAllOrganization);
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
  orgController.createOrganization
);

router.get(
  "/getOrganization/:orgId",
  verifier.orgIdVerifier,
  orgController.getOrganization
);


router.post(
  "/addBloodData/:orgId",
  [body("bloodData").notEmpty(), param("orgId").notEmpty().isMongoId()],
  checkInvalidInput.checkError,
  verifier.orgIdVerifier,
  orgController.addBloodData
);

router.put(
  "/updateOrganization/:orgId",
  [
    body("name").notEmpty(),
    body("address").notEmpty(),
    body("state").notEmpty(),
    body("city").notEmpty(),
    body("PIN").isNumeric().isLength({ min: 6, max: 6 }),
    body("contactNumber").isNumeric().isLength({ min: 10, max: 10 }),
  ],
  checkInvalidInput.checkError,
  verifier.orgIdVerifier,
  orgController.updateOrganization
);
router.put(
  "/updateBloodData/:bloodId",
  [body("bloodData").notEmpty(), param("bloodId").notEmpty().isMongoId()],
  checkInvalidInput.checkError,
  verifier.bloodIdVerifier,
  orgController.updateBloodData
);

router.delete(
  "/deleteOrganization/:orgId",
  verifier.orgIdVerifier,
  orgController.deleteOrganization
);

module.exports = router;
