const HttpError = require("../models/http-error");
const Blood = require("../models/blood");

const orgIdVerifier = (req, res, next) => {
  const { orgId } = req.params;
  console.log(req.userData, "userData");
  console.log(req.workspace, "workspace");
  if (
    req.userData.role === "orgAdmin" &&
    orgId !== req.workspace.orgId.toString()
  ) {
    return next(new HttpError("Forbidden Resource", 403));
  }
  next();
};

const bloodIdVerifier = async (req, res, next) => {
  const { bloodId } = req.params;
  try {
    const bloodData = await Blood.findById(bloodId);
    if (!bloodData) {
      return next(new HttpError("No blood data found.", 404));
    }
    if (
      req.userData.role === "orgAdmin" &&
      bloodData.orgId.toString() != req.workspace.orgId.toString()
    ) {
      return next(new HttpError("Forbidden Resource", 403));
    }
    next();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Internal server error .Verifier Failed.", 500));
  }
};
module.exports = { orgIdVerifier, bloodIdVerifier };
