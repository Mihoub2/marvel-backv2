const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    const doestEmailExist = await User.findOne({ email: email });

    if (doestEmailExist) {
      res.status(409).json({ message: "Email does already exist" });
    } else {
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(16);

      const newUser = new User({
        username: username,
        email: email,
        token: token,
        salt: salt,
        hash: hash,
      });

      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        token: newUser.token,
      });
    }
  } else {
    res.status(406).json({ message: "Missing info" });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const userToCheck = await User.findOne({ email: req.body.email });
    if (userToCheck === null) {
      res.status(401).json({ message: "Unauthorized 1" });
    } else {
      const newHash = SHA256(req.body.password + userToCheck.salt).toString(
        encBase64
      );

      if (newHash === userToCheck.hash) {
        res.json({
          _id: userToCheck._id,
          token: userToCheck.token,
        });
      } else {
        res.status(401).json({ message: "Unauthorized 2" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
