const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please give a name"],
    unique: true,
    trim: true,
  },
});

module.exports =
  mongoose.models.Upload || mongoose.model("Upload", UploadSchema);
