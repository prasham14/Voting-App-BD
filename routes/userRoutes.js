const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

router.get("/", (req, res) => {
  res.send("Hello From Prasham")
})
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const adminUser = await User.findOne({ role: "admin" });

    if (data.role === "admin" && adminUser) {
      return res.status(404).json("Only one admin allowed");
    }
    const newUser = new User(data);
    const response = await newUser.save();

    console.log("data saved");
    const payload = { id: response.id };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    // console.log("Token :  ", token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { Adhaar, password } = req.body;
    const user = await User.findOne({ Adhaar: Adhaar });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json("Invalid Username or Password");
    }
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
});
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
});

router.put("/profile/password", async (req, res) => {
  try {
    const userID = req.user.id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userID);
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json("Invalid Username or Password");
    }
    user.password = newPassword;
    const response = await user.save();
    console.log("Password Updated");
    res.status(200).json({ message: "Password Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  checking git works or not
module.exports = router;
