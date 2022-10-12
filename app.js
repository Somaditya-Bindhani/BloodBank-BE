const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./router/router");
const dotenv = require("dotenv");

app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  return res.json("Hello World !");
});

app.use("/api", router);

app.use((err, req, res, next) => {
  res
    .status(err.code || 500)
    .json({ error: err.message || "Something went wrong" });
});
app.use("*", (req, res) => {
  res.status(500).json({ error: "Route not found" });
});

try {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database Connected.");
  app.listen(5050, () => {
    console.log("App started at port 5050.");
  });
} catch (err) {
  console.log(err);
}
