// SystemSettings model — single record for academic/institution defaults
// (school name, current session and semester) shown in Settings > System.
const mongoose = require("mongoose");

// Schema
const systemSettingsSchema = new mongoose.Schema({
  schoolName: String,
  session: String,
  semester: String,
});

module.exports = mongoose.model("SystemSettings", systemSettingsSchema);
