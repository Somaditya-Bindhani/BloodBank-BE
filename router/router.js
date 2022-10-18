const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authentication = require("../middlewares/auth");
const authorization = require("../middlewares/authorization");
const authRoutes = require("./authRouter");
const orgAdminRoutes = require("./orgAdminRouter");
const organizationRoutes = require("./organizationRouter");

router.use("/auth", authRoutes);

router.use(authentication, authorization);
router.use("/orgAdmin", orgAdminRoutes);
router.use("/organization", organizationRoutes);

module.exports = router;
