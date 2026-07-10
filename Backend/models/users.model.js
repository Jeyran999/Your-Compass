const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 15
  },
  password: {
    type: String,
    required: true
  },
});

const User = mongoose.model("User", userSchema)

// Export
module.exports = User