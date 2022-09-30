// create org admin
// activate org admin
// linkOrgAdmin

// update org admin
// delete org adin

const OrgAdmin = require("../models/orgAdmin");

const createOrgAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await OrgAdmin.findOne({ email });
    if (userData) {
      return res
        .status(404)
        .json("User Exist. Please try with a different email .");
    }
    const data = new OrgAdmin({
      email,
    });
    await data.save();
    return res.status(200).json("User Created .");
  } catch (err) {
    return res
      .status(500)
      .json("Internal server error .Unable to create user .");
  }
};

const linkOrgAdmin = async (req, res) => {
  const { orgAdminId, orgId } = req.body;
  try {
    const orgData = await Organization.findOne({ _id: orgId });
    const orgAdmin = await OrgAdmin.findOne({ _id: orgAdminId });
    if (!orgData || !orgAdmin) {
      return res
        .status(404)
        .json("Organization or Organzation Admin does not exist.");
    }
    const data = new Workspace({
      orgAdminId: orgAdmin._id,
      orgId: orgData._id,
    });
    await data.save();
    return res.status(200).json("Linkage Created .");
  } catch (err) {
    return res
      .status(500)
      .json("Internal server error .Unable to create Linkage .");
  }
};

const activateOrgAdmin = async (req, res) => {
  const { orgAdminId } = req.body;
  try {
    const orgAdmin = await OrgAdmin.findById(orgAdminId);
    if (!orgAdmin) {
      return res.status(404).json("Organization Admin Not Found .");
    }

    const tempPassword = (Math.random() + 1).toString(36).substring(2);
    const password = await bcrypt.hash(tempPassword, 12);
    orgAdmin.password = password;
    await orgAdmin.save();

    return res.status(200).json("Organization Admin Activation Sucessfull .");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json("Internal server error .Unable to create Linkage .");
  }
};

module.exports = {
  createOrgAdmin,
  linkOrgAdmin,
  activateOrgAdmin,
};
