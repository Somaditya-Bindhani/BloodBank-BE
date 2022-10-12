const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Organization = require("../models/organization");

const allOrganizations = async (req, res, next) => {
  try {
    let allOrganizations;
    allOrganizations = await Organization.find();
    if (!allOrganizations)
      return next(new HttpError("Organizations Not Available", 404));

    return res.json(allOrganizations);
  } catch (err) {
    return next(new HttpError("Failed to fetch organisations", 500));
  }
};
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
    await data.save();
    return res.status(200).json({ message: "Organization Created ." });
  } catch (err) {
    return next(
      new HttpError(
        "Internal server error .Unable to create IOrganization .",
        500
      )
    );
  }
};
const getOrganization = async (req, res, next) => {
  const { organizationId } = req.params;
  try {
    const organizationDetail = await Organization.findById(organizationId);
    if (!organizationDetail)
      return next(new HttpError("Organisation Details Not Found", 404));
    return res.status(200).json(organizationDetail);
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const deleteOrganization = async (req, res, next) => {
  const { organizationId } = req.params;
  console.log("ok");
  try {
    const data = await Organization.deleteOne({ _id: organizationId });

    if (data && data.acknowledged && data.deletedCount)
      return res.redirect(302, "/api/organization/");
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

module.exports = {
  createOrganization,
  getOrganization,
  deleteOrganization,
  updateOrganization,
  allOrganizations,
};
