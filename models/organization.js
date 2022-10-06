const mongoose = require("mongoose");
const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  PIN: {
    type: Number,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
});

const organizationModel = new mongoose.model(
  "organization",
  organizationSchema
);

module.exports = organizationModel;
