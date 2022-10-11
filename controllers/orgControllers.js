const mongoose = require("mongoose");
const Organization = require("../models/organization");

const createOrganization = async (req, res) => {
  const { name, address, state, city, PIN, contactNumber } = req.body;
  try {
    const orgData = await Organization.findOne({ name, state, city });
    if (orgData) {
      console.log(orgData);
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
    return res.status(200).json("Organization Created .");
  } catch (err) {
    return res
      .status(500)
      .json("Internal server error .Unable to create IOrganization .");
  }
};
const getOrganization = async (req, res) => {
  const { organizationId } = req.params;
  try {
    const organizationDetail = await Organization.findById(organizationId);
    return res.status(200).json(organizationDetail);
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
    return res.state(200).json(updatedOrganization);
  } catch (err) {
    return res.status(500).json({ errorMessage: err.message });
  }
};

module.exports = {
  createOrganization,
  getOrganization,
  deleteOrganization,
  updateOrganization,
};
