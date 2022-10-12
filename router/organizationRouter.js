const express = require("express");
const { body } = require("express-validator");
const router = express.Router({ mergeParams: true });
const orgController = require("../controllers/orgControllers");
const checkInvalidInput = require("../middlewares/invalidPost");

router.get("/", orgController.getAllOrganization);
router.get("/getOrganization/:orgId", orgController.getOrganization);

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
router.post(
  "/addBloodData",
  [body("bloodData").notEmpty(), body("orgId").isMongoId()],
  checkInvalidInput.checkError,
  orgController.addBloodData
);

router.put(
  "/updateOrganization/:organizationId",
  [
    body("name").notEmpty(),
    body("address").notEmpty(),
    body("state").notEmpty(),
    body("city").notEmpty(),
    body("PIN").isNumeric().isLength({ min: 6, max: 6 }),
    body("contactNumber").isNumeric().isLength({ min: 10, max: 10 }),
  ],
  checkInvalidInput.checkError,
  orgController.updateOrganization
);

router.delete(
  "/deleteOrganization/:organizationId",
  orgController.deleteOrganization
);


module.exports = router;
