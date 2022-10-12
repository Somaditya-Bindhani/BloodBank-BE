const express = require("express");
const app = express();
const router = require("./router/router");
const dotenv = require("dotenv");
const databaseConnect = require("./config/database");

app.use(express.json());
dotenv.config();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
//   next();
// });

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
