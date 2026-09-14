// =====================================================================
// SMS Backend API — Express + MongoDB (mongoose)
// Exposes REST endpoints for:
//   - Admin profile      GET/POST /api/profile
//   - System settings    GET/POST /api/settings/system
//   - Students CRUD      GET/POST /api/students, PUT/DELETE /api/students/:id
// NOTE: `fs` / `DB_FILE` are leftovers — all data lives in MongoDB here.
// =====================================================================
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Student = require("./model/Student");
const Profile = require("./model/Profile");
const SystemSettings = require("./model/systemSettings");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, "db.json");

// Middleware
app.use(cors());
app.use(express.json());

const MONGO_URL = "mongodb://localhost:27017/sms_database";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("connected to MongoDB successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ==================== ADMIN PROFILE ENDPOINTS ==================== //

// Get admin profile
app.get("/api/profile", async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        fullName: "mba samuel",
        email: "samuelifeanyi943@gmail.com",
        role: "Administrator",
        phone: "07040405156",
      });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Update admin profile
app.post("/api/profile", async (req, res) => {
  try {
    // The React UI uses the key `name`, but the Profile schema (and the GET
    // endpoint above) stores `fullName`. Normalise the incoming payload so the
    // name is always persisted — this is what keeps the top header accurate
    // after a page refresh.
    const { name, ...rest } = req.body;
    const payload = { ...rest, fullName: name || rest.fullName };

    const profile = await Profile.findOneAndUpdate({}, payload, {
      new: true,
      upsert: true, // create the profile document if it does not exist yet
    });
    res.json({ message: "Profile updated succesfully!", profile });
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// ==================== SYSTEM SETTINGS ENDPOINTS ==================== //

// Get system settings
app.get("/api/settings/system", async (req, res) => {
  try {
    const settings = await SystemSettings.findOne();
    res.json(
      settings || {
        schoolName: "",
        session: "",
        semester: "",
      },
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch system settings" });
  }
});

// Update system settings
app.post("/api/settings/system", async (req, res) => {
  try {
    const settings = await SystemSettings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json({ message: "System settings updated", systemSettings: settings });
  } catch (err) {
    res.status(500).json({ error: "Failed to update system settings" });
  }
});

// ==================== STUDENTS CRUD ENDPOINTS ==================== //

// Get all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error("Backend Fetch Error", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// Create student
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();

    const updatedList = await Student.find();
    res.json({ message: "Student saved successfully", students: updatedList });
  } catch (err) {
    res.status(500).json({ error: "Failed to save student" });
  }
});

// Update student
app.put("/api/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    const updatedList = await Student.find();
    res.json({
      message: "Student updated successfully",
      students: updatedList,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update student" });
  }
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    const updatedList = await Student.find();
    res.json({
      message: "Student deleted successfully!",
      students: updatedList,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
