const HttpError = require("../models/http-error");
const Organization = require("../models/organization");
const Workspace = require('../models/workspace');

const createOrganization = async (req, res, next) => {
  const { name, address, state, city, PIN, contactNumber } = req.body;
  try {
    const orgData = await Organization.findOne({ name, state, city });
    if (orgData) {
      console.log(orgData);
      return next(new HttpError("Organization Exist.", 404));
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
    return res.status(200).json("Organization Created .");
  } catch (err) {
    return next(new HttpError("Internal server error .Unable to create IOrganization .", 500));
  }
};
const getOrganization = async (req, res, next) => {
  const { organizationId } = req.params;
  try {
    const orgDetails = await Organization.findById(organizationId);
    // return res.status(200).json(organizationDetail);
    const orgAdminIds = await Workspace.find({orgId: organizationId}).select({orgAdminId: 1, _id: 0});
    const adminIds = orgAdminIds.map(data => data.orgAdminId);
    const data = {...orgDetails, adminIds};
    return res.status(201).json(data); 
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const deleteOrganization = async (req, res, next) => {
  const { organizationId } = req.params;

  try {
    await Organization.deleteOne({ _id: organizationId });
    return res.status(200).json("Organization Deleted.");
  } catch (err) {
    return next(new HttpError(err. message, 500));
  }
};

const updateOrganization = async (req, res, next) => {
  const { organizationId, updatedValues } = req.body;
  // updatedValues -> object contains fields to be updated with values
  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      updatedValues
    );
    return res.state(200).json(updatedOrganization);
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

module.exports = {
  createOrganization,
  getOrganization,
  deleteOrganization,
  updateOrganization,
};
