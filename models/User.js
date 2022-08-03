const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  email: String,
  description: String,
  token: String,
  salt: String,
  hash: String,
});

module.exports = User;
