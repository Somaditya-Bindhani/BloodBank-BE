const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Organization = require("../models/organization");
const Workspace = require("../models/workspace");
const Blood = require("../models/blood");
const createOrganization = async (req, res) => {



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

const getOrganization = async (req, res) => {
  const { orgId } = req.params;
  try{
  if(!orgId){
    let organizations = await Organization.find();
    return res.status(200).json(organizations);
  }
    const workspace = await Workspace.findOne({ orgId: orgId })
      .populate({
        path: "orgId",
      })
      .populate({ path: "orgAdminId", select: ["email", "name" ] });
    return res.status(200).json(workspace);
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const deleteOrganization = async (req, res, next) => {
  const { organizationId } = req.params;
  try {
    await Organization.deleteOne({ _id: organizationId });
    return res
      .status(200)
      .json({ message: "Organization Deleted Successfully." });
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
  console.log(req.body);
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
  allOrganizations
};
