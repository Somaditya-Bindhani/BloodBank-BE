const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OrgAdmin = require("../models/orgAdmin");
const HttpError = require("../models/http-error");
const superAdmin = require("../data/superAdmin");
const Workspace = require("../models/workspace");
const adminModel = require("../models/admin");

// controller to create super admin only for development
const createSuperAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    let data = new OrgAdmin({
      email,
      password: hashedPassword,
      role: "superAdmin",
      isReset: true,
    });
    data = await data.save();
    return res.json("Super Admin Created.");
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed to create Super Admin.", 500));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userData = await OrgAdmin.findOne({ email });
    if (!userData) {
      if (!userData) {
        return next(new HttpError("User Not found.", 404));
      }
    }
    const passIsValid = await bcrypt.compare(password, userData.password);
    if (!passIsValid) {
      return next(new HttpError("Invalid Credentails.", 402));
    }
    let data = {
      _id: userData.id.toString(),
      email: userData.email,
      role: userData.role,
      isReset: userData.isReset,
    };
    if (userData.isReset) {
      const token = jwt.sign(
        { email: userData.email, id: userData.id.toString() },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      data = { ...data, accessToken: token, workspace: req.workspace };
    }
    return res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    return next(HttpError("Internal Server Error.", 500));
  }
};

module.exports = {
  login,
  createSuperAdmin,
};
