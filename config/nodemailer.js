const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testactivation962bb@gmail.com",
    pass: "testPassword123@",
  },
});

module.exports  = {
  transporter,
};
