const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const Candidate = require("../models/candidate");
const isAdmin = async (userID) => {
  try {
    const user = await User.findById(userID);
    if (user.role === "admin") {
      return true;
    }
  } catch (err) {
    return false;
  }
};

router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await isAdmin(req.user.id))) {
      return res.status(403).json({ message: "You are not a admin " });
    }
    const data = req.body;
    const newCandidate = new Candidate(data);
    const response = await newCandidate.save();

    console.log("data saved");
    res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:candidateID", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!isAdmin(req.user.id)) {
      return res.status(403).json({ message: "You are not a admin " });
    }
    const candidateID = req.params.candidateID;
    const updatedCandidateData = req.body;

    const response = await Candidate.findByIdAndUpdate(
      candidateID,
      updatedCandidateData,
      {
        new: true, //returns updated document
        runValidators: true, // for validations in mongoose , it checks the schema in which what is required
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Candidate not found " });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:candidateID", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!isAdmin(req.user.id)) {
      return res.status(403).json({ message: "You are not a admin " });
    }
    const candidateID = req.params.candidateID;

    const response = await Candidate.findByIdAndDelete(candidateID);
    if (!response) {
      return res.status(404).json({ error: "Candidate not found " });
    }
    console.log("Data deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// for voting
router.post("/vote/:candidateID", jwtAuthMiddleware, async (req, res) => {
  candidateID = req.params.candidateID;
  userID = req.user.id;
  try {
    const candidate = await Candidate.findById(candidateID);
    if (!candidate) {
      return res.status(404).json("Candidate not found");
    }
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (user.isVoted) {
      return res.status(404).json("You can vote only once");
    }
    if (user.role === "admin") {
      return res.status(404).json("Admin is not allowed to vote");
    }
    candidate.votes.push({ user: userID });
    candidate.voteCount++;
    await candidate.save();

    user.isVoted = true;
    await user.save();
    return res.status(200).json("You have voted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// for vote counts
router.get("/vote/count", async (req, res) => {
  try {
    // const data = req.body;
    const candidates = await Candidate.find().sort({ voteCount: "desc" });
    const voteRecord = candidates.map((data) => {
      return {
        party: data.party,
        count: data.voteCount,
      };
    });
    return res.status(200).json(voteRecord);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//  for candidate names
router.get("/", async (req, res) => {
  try {
    // const data = req.body;
    const candidateName = await Candidate.find({}, "name party -_id");
    return res.status(200).json(candidateName);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
