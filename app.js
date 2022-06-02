const express = require("express");
require("dotenv").config();
require("./db");
const userRouter = require("./routes/user");

const User = require("./models/user");

const app = express();

app.use(express.json());
app.use(userRouter);

app.get("/test", (req, res) => {
  res.send("Hello world");
});

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to backend zone!" });
});

app.listen(8000, () => {
  console.log("port is listening");
});
