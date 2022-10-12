const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const authRoutes = require("./authRouter");
const orgAdminRoutes = require("./orgAdminRouter");
const organizationRoutes = require("./organizationRouter");

router.use("/auth", authRoutes);
// router.use(authMiddleware);

router.use("/orgAdmin", orgAdminRoutes);
router.use("/organization", organizationRoutes);

module.exports = router;
