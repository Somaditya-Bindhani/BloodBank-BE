const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const HttpError = require("../models/http-error");
const Workspace = require("../models/workspace");
const adminModel = require("../models/admin");

// controller to creat super admin only for devlopment
// const signup = async (req, res, next) => {
//   let hashedPassword;
//   try {
//     hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 12);
//   } catch (err) {
//     return next(new HttpError("Could not create account.Try Again", 500));
//   }
//   const superAdmin = {
//     email: "super_admin1@blood_bank.com",
//     password: hashedPassword,
//   };
//   const newSuperAdmin = new adminModel(superAdmin);
//   try {
//     const data = await newSuperAdmin.save();
//     if (!data) return next(new HttpError("Failed to create super user", 500));
//     return res.json(data);
//   } catch (err) {
//     return next(new HttpError("Failed to create super user", 500));
//   }
// };

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userData = await Admin.findOne({ email });
    if (!userData) {
      return next(new HttpError("User Not found.", 404));
    }

    let passIsValid = false;
    passIsValid = await bcrypt.compare(password, userData.password);
    if (!passIsValid) {
      return next(new HttpError("Invalid Credentails.", 402));
    }

    let token;
    token = jwt.sign(
      { email: userData.email, id: userData.id.toString() },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      accessToken: token,
      userId: userData.id.toString(),
      email,
      isSuperAdmin: true,
    });
  } catch (err) {
    console.log(err.message);
    return next(HttpError("Internal Server Error.", 500));
  }
};

module.exports = {
  login,
};
