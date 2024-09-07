const mongoose = require("mongoose");
require("dotenv").config();
const mongoURL = process.env.MONGODB_URL_LOCAL; //local url
// const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to monogDB server");
});
db.on("Error", () => {
  console.log("Connection Error");
});

db.on("disconnected", () => {
  console.log("Server Disconnected");
});

module.exports = db;
