const rules = require("../data/rule");
const bypass = require("../data/bypass");
const OrgAdmin = require("../models/orgAdmin");
const Workspace = require("../models/workspace");
const HttpError = require("../models/http-error");

const authorization = async (req, res, next) => {
  const url = req.path;
  const allPath = url.split("/");
  const orgAdminId = req.userData.userId;
  try {
    const user = await OrgAdmin.findById(orgAdminId);
    const workspace = await Workspace.find({ orgAdminId });
    if (!user.isReset) {
      return next(new HttpError("User Password Reset Required.", 400));
    }
    // console.log(rules[allPath[1]])
    const access = rules[allPath[1]][allPath[2]].find(
      (ele) => ele.role === user.role
    ).access;
    if (!access) {
      return next(new HttpError("Access Denied.", 403));
    }
    req.userData = user;
    req.workspace = workspace[0];
    next();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Internal Server Error.", 500));
  }
};

module.exports = authorization;
