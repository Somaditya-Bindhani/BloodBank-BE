const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const userData = await Admin.findOne({ userId });
    if (!userData) {
      return res.status(404).json("User Not found .");
    }

    let passIsValid = false;
    passIsValid = await bcrypt.compare(password, userData.password);
    if (!passIsValid) {
      return res.status(402).json("Invalid Credentails .");
    }

    let token;
    token = jwt.sign(
      { userId: userData.userId, id: userData.id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json("Internal server error .Unable to login .");
  }
};
module.exports = {
  login,
};
