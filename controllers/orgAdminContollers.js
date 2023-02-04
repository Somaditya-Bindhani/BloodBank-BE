const OrgAdmin = require("../models/orgAdmin");
const bcrypt = require("bcryptjs");
const Workspace = require("../models/workspace");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");

const createOrgAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  const { orgId } = req.params;
  if (!orgId) return next(new HttpError("Organisation Id not specified", 400));
  try {
    const userData = await OrgAdmin.findOne({ email });
    if (userData) {
      return next(
        new HttpError(
          "Admin Already Exists. Please try with a different email .",
          400
        )
      );
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

    return res.status(200).json({
      _id: orgAdminData._id,
      email: orgAdminData.email,
      isReset: orgAdminData.isReset,
      role: orgAdminData.role,
    });
  } catch (err) {
    return next(
      new HttpError("Internal server error .Unable to create user.", 500)
    );
  }
};

const orgAdminPassReset = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await OrgAdmin.findOne({ email });
    if (!user) {
      return next(new HttpError("No User Found .", 404));
    }
    const passIsSame = await bcrypt.compare(password, user.password);
    if (passIsSame) {
      return next(
        new HttpError("New Password and Old Password are same.", 402)
      );
    }
    const hassedPassword = await bcrypt.hash(password, 12);
    user.password = hassedPassword;
    user = await user.save();
    return res.status(200).json("Password Reset Sucessfull .");
  } catch (err) {
    console.log(err);
    return next(new HttpError("Internal Server Error.", 500));
  }
};

const linkOrgAdmin = async (req, res, next) => {
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

const activateOrgAdmin = async (req, res, next) => {
  const { orgAdminId } = req.body;
  try {
    const orgAdmin = await OrgAdmin.findById(orgAdminId);
    if (!orgAdmin) {
      return next(new HttpError("Organization Admin Not Found .", 404));
    }

    if (orgAdmin.isReset) {
      return next(new HttpError("Organization Admin Already active.", 400));
    }

    orgAdmin.isReset = true;
    await orgAdmin.save();

    return res.status(200).json("Organization Admin Activation Sucessfull .");
  } catch (err) {
    console.log(err);
    return next(new HttpError("Internal server error", 500));
  }
};

const getOrgAdminWorkspace = async (req, res, next) => {
  const { orgAdminId } = req.params;
  console.log(orgAdminId);
  const workspaces = await Workspace.find({ orgAdminId });
  return res.status(200).send(workspaces);
};

module.exports = {
  createOrgAdmin,
  linkOrgAdmin,
  activateOrgAdmin,
  orgAdminPassReset,
  getOrgAdminWorkspace,
};
