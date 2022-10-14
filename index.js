const express = require("express");
const app = express();
const router = require("./router/router");
const dotenv = require("dotenv");
const databaseConnect = require("./config/database");
const corsConfig = require("./config/cors");
const cors = require("cors");

app.use(express.json());
dotenv.config();
app.use(cors(corsConfig.config));

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

databaseConnect.connect();
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log("App started at port 5050.");
});
