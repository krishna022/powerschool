const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: {
      type: String,
      unique: true,
      lowercase: true
      },
    password: String,
  },
  { timestamps: true })
);

module.exports = User;