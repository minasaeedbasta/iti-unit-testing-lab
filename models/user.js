// models/user.js

const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    unique: false,
  },
  last_name: {
    type: String,
    required: true,
    unique: false,
  },
  age: {
    type: Number,
    required: true,
    unique: false,
  }
});

// Create a User model from the user schema
const User = mongoose.model("User", userSchema);

module.exports = User;
