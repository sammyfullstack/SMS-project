// Profile model — holds the single admin profile record.
// NOTE: the name lives under `fullName` (not `name`). The frontend maps its
// `name` state to/from this field when loading/saving.
const mongoose = require("mongoose");

// Schema
const profileSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  role: String,
  // Stored as text so formats like "+234 0700 000 000" survive (a Number
  // type would strip leading zeros and punctuation).
  phone: String,
});

module.exports = mongoose.model("Profile", profileSchema);
