const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connect = async () => {
  console.log(process.env.MONGO_URL);
  //   try {
  //     await mongoose.connect(process.env.MONGO_URL, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //       autoIndex: false,
  //     });
  //     console.log("Database Connected.");
  //   } catch (err) {
  //     console.log(err);
  //   }
};
module.exports.connect = connect;
