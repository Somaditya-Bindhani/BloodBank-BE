const mongoose = require("mongoose");
const bloodUnit = new mongoose.Schema({
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organization",
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
});

bloodUnit.index({ orgId: 1, bloodGroup: 1 }, { unique: true });
const bloodModel = new mongoose.model("blood", bloodUnit);

module.exports = bloodModel;
