const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    });
    console.log("Database Connected.");
  } catch (err) {
    console.log(err);
  }
};
module.exports.connect = connect;
