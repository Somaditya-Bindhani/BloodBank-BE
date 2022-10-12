const mongoose = require("mongoose");
const Organization = require("../models/organization");
const Workspace = require("../models/workspace");
const Blood = require("../models/blood");
const createOrganization = async (req, res) => {
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
    return res.status(200).json({ orgId: data.id });
  } catch (err) {
    return res
      .status(500)
      .json("Internal server error .Unable to create IOrganization .");
  }
};

const getOrganization = async (req, res) => {
  const { orgId } = req.params;
  try {
    const workspace = await Workspace.findOne({ orgId: orgId })
      .populate({
        path: "orgId",
      })
      .populate({ path: "orgAdminId", select: ["email", "name" ] });
    return res.status(200).json(workspace);
  } catch (err) {
    return res.status(500).json({ errorMessage: err.message });
  }
};

const deleteOrganization = async (req, res) => {
  const { organizationId } = req.params;

  try {
    await Organization.deleteOne({ _id: organizationId });
    return res.status(200).json("Organization Deleted.");
  } catch (err) {
    return res.status(500).json({ errorMessage: err.message });
  }
};

const updateOrganization = async (req, res) => {
  const { organizationId, updatedValues } = req.body;
  // updatedValues -> object contains fields to be updated with values
  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      updatedValues,
      () => {}
    );
    return res.status(200).json(updatedOrganization);
  } catch (err) {
    return res.status(500).json({ errorMessage: err.message });
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
};
