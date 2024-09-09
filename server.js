const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);
app.get("/", (req, res) => {
  res.send("Hello User , this Website do not contain any UI , this is a backend project ,please use a API testing tool for using this Project . Thank You ! ");
});
app.listen(PORT, () => {
  console.log("listening on port 3000");
});
