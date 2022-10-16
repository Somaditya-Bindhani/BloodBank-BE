const rules = require("../data/rule");
const OrgAdmin = require("../models/orgAdmin");
const Workspace = require("../models/workspace");
const HttpError = require("../models/http-error");

const authorization = async (req, res, next) => {
  const url = req.path;
  var allPath = url.split("/");
  const orgAdminId = req.userData.userId;
  let user;
  let workspace;
  try {
    user = await OrgAdmin.findById(orgAdminId);
    workspace = await Workspace.find({ orgAdminId });
  } catch (err) {
    console.log(err);
  }
  const access = rules[allPath[1]][allPath[2]].find(
    (ele) => ele.role === user.role
  ).access;
  if (!access) {
    return next(new HttpError("Access Denied.", 403));
  }
  req.userData = user;
  req.workspace = workspace[0];
  next();
};

module.exports = authorization;
