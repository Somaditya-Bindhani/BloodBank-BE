const mongoose = require("mongoose");
const workspaceSchema = new mongoose.Schema({
  orgAdminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: "orgAdmin",
  },
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organization",
  },
});

const workspaceModel = new mongoose.model("workspace", workspaceSchema);

module.exports = workspaceModel;
