const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add a mail address"],
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: [true, "Please add a password"],
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
