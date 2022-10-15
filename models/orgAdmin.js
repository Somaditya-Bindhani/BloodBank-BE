const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "orgAdmin",
  },
  isReset: {
    type: Boolean,
    default: false,
  },
});

const adminModel = new mongoose.model("orgAdmin", adminSchema);

module.exports = adminModel;
