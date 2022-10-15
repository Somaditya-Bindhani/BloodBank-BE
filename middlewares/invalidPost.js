const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const checkError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid Inputs", 400));
  }
  next();
};

module.exports = {
  checkError,
};
