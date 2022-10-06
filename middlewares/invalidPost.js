const { validationResult } = require("express-validator");

const checkError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json("Invalid Inputs!");
  }
  next();
};

module.exports = {
  checkError,
};
