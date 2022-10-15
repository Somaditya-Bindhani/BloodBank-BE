const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Organization = require("../models/organization");
const Workspace = require("../models/workspace");
const Blood = require("../models/blood");

const createOrganization = async (req, res, next) => {
  const { name, address, state, city, PIN, contactNumber } = req.body;
  try {
    const orgData = await Organization.findOne({ name, state, city });
    if (orgData) {
      return res.status(404).json("Organization Exist.");
    }
    const data = new Organization({
      name,
      address,
      state,
      city,
      PIN,
      contactNumber,
    });
    data = await data.save();
    return res.status(200).json({ orgId: data._id });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError(
        "Internal server error .Unable to create Organization .",
        500
      )
    );
  }
};

const getAllOrganization = async (req, res, next) => {
  try {
    let organizations = await Organization.find();
    return res.status(200).json(organizations);
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};
const getOrganization = async (req, res, next) => {
  const { orgId } = req.params;
  if (!orgId) return next(new HttpError("Organisation Id not specified", 400));
  try {
    const org = await Organization.findById(orgId);

    const admins = await Workspace.find(
      { orgId: orgId },
      { _id: false }
    ).populate({
      path: "orgAdminId",
      select: ["email"],
    });
    const orgDetails = {
      org,
      admins,
    };
    return res.status(200).json(orgDetails);
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const deleteOrganization = async (req, res, next) => {
  const { organizationId } = req.params;
  if (!organizationId)
    return next(new HttpError("Organization Id Not Specified", 400));
  try {
    const data = await Organization.deleteOne({ _id: organizationId });

    if (data && data.acknowledged && data.deletedCount)
      return res.redirect(303, "/api/organization/");
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const updateOrganization = async (req, res, next) => {
  const { name, address, state, city, PIN, contactNumber } = req.body;
  const updatedValues = { name, address, state, city, PIN, contactNumber };
  const { organizationId } = req.params;
  // updatedValues -> object contains fields to be updated with values
  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      updatedValues,
      { returnDocument: "after" }
    );
    return res.status(200).json(updatedOrganization);
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const addBloodData = async (req, res) => {
  const { bloodData, orgId } = req.body;

  try {
    const data = await Blood.insertMany(
      bloodData.map((ele) => ({ ...ele, orgId: orgId }))
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrganization,
  getOrganization,
  deleteOrganization,
  updateOrganization,
  addBloodData,
  getAllOrganization,
};
