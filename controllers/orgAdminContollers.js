const OrgAdmin = require("../models/orgAdmin");
const bcrypt = require("bcryptjs");
const Workspace = require("../models/workspace");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");

const createOrgAdmin = async (req, res) => {
  const { email, orgId, password } = req.body;
  try {
    const userData = await OrgAdmin.findOne({ email });

    if (userData) {
      return res
        .status(404)
        .json("User Exist. Please try with a different email .");
    }

    const hassedPassword = await bcrypt.hash(password, 12);
    const orgAdminData = new OrgAdmin({
      email,
      password: hassedPassword,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await orgAdminData.save();
    const workspaceData = new Workspace({
      orgAdminId: orgAdminData._id,
      orgId: orgId,
    });
    await workspaceData.save();
    session.commitTransaction();

    return res.status(200).json(orgAdminData);
  } catch (err) {
    return res
      .status(500)
      .json("Internal server error .Unable to create user .");
  }
};

const orgAdminPassReset = async (req, res, next) => {
  const { email, newPassword, oldPassword } = req.body;
  try {
    if (oldPassword === newPassword) {
      return next(new HttpError("Old and New Password can't be same.", 400));
    }
    let user = await OrgAdmin.findOne({ email });
    if (!user) {
      return next(new HttpError("No User Found .", 404));
    }
    let passIsValid = await bcrypt.compare(oldPassword, user.password);
    if (!passIsValid) {
      return next(new HttpError("Invalid Credentails.", 402));
    }
    const hassedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hassedPassword;
    user.isReset = true;
    user = await user.save();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return next(new HttpError("Internal Server Error.", 500));
  }
};

const linkOrgAdmin = async (req, res) => {
  const { orgAdminId, orgId } = req.body;
  try {
    const orgData = await Organization.findOne({ _id: orgId });
    const orgAdmin = await OrgAdmin.findOne({ _id: orgAdminId });
    if (!orgData || !orgAdmin) {
      return res
        .status(404)
        .json("Organization or Organzation Admin does not exist.");
    }
    const data = new Workspace({
      orgAdminId: orgAdmin._id,
      orgId: orgData._id,
    });
    await data.save();
    return res.status(200).json("Linkage Created .");
  } catch (err) {
    return res
      .status(500)
      .json("Internal server error .Unable to create Linkage .");
  }
};

const activateOrgAdmin = async (req, res) => {
  const { orgAdminId } = req.body;
  try {
    const orgAdmin = await OrgAdmin.findById(orgAdminId);
    if (!orgAdmin) {
      return res.status(404).json("Organization Admin Not Found .");
    }

    const tempPassword = (Math.random() + 1).toString(36).substring(2);
    const password = await bcrypt.hash(tempPassword, 12);
    orgAdmin.password = password;
    await orgAdmin.save();

    return res.status(200).json("Organization Admin Activation Sucessfull .");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json("Internal server error .Unable to create Linkage .");
  }
};

module.exports = {
  createOrgAdmin,
  linkOrgAdmin,
  activateOrgAdmin,
  orgAdminPassReset,
};
