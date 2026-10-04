// Student model — one document per registered student.
const mongoose = require("mongoose");

// Schema (the `unique` flags also create indexes in MongoDB)
const studentSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    age: { type: Number, require: true },
    department: { type: String, require: true },
    level: { type: String, require: true },
    matricNo: { type: String, require: true, unique: true },
  },
  { timestamps: true }, //creates createdAt and updatedAt fields
);

// Model
module.exports = mongoose.model("Student", studentSchema);
