const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

app.get("/",(req, res) => {
    return res.json("Hello World !")
});

try {
  mongoose.connect(
    "mongodb+srv://bbUser:qwerty123@cluster0.cdiv8qk.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("Database Connected.");
  app.listen(5000, () => {
    console.log("App started at port 5000.");
  });
} catch (err) {
  console.log(err);
}
