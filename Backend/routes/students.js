const express = require("express");
const Student = require("../model/Student");
const router = express.Router();

// POST /api/students/bulk
router.post("/bulk", async (req, res) => {
  try {
    const rawData = req.body;

    if (!Array.isArray(rawData) || rawData.length === 0) {
      return res.status(400).json({ message: "Import array cannot be empty." });
    }

    // 1. Clean and normalize incoming rows
    const cleanedRows = [];

    // Header-name aliases — cell keys from real exports vary wildly
    // ("Name" vs "Full Name" vs "Student Name", "Email" vs "Email Address",
    // "Matric No" vs "Matric No.", ...). First match wins.
    const pick =
      (...keys) =>
      (row) => {
        for (const k of keys) {
          const v = row[k];
          if (v !== undefined && v !== null && String(v).trim() !== "") return v;
        }
        return undefined;
      };

    const getName = pick(
      "Full Name", "Fullname", "Student Name", "StudentName",
      "Student's Name", "Name", "STUDENT NAME", "name",
    );
    const getEmail = pick(
      "Email Address", "Email", "E-mail", "EMAIL", "EMAIL ADDRESS", "email",
    );
    const getMatric = pick(
      "Matric No.", "Matric No", "Matric Number", "Matriculation Number",
      "MatricNo", "matricNo", "Reg Number", "Registration Number",
      "Reg. Number", "matric no",
    );
    const getLevel = pick("Level", "level", "LEVEL");
    const getDepartment = pick(
      "Department", "department", "DEPARTMENT", "Dept", "Programme",
    );
    const getAge = pick("Age", "age", "AGE");

    for (let i = 0; i < rawData.length; i++) {
      const row = rawData[i];

      // Clean key names (handles extra spaces from report exports)
      const normalizedRow = {};
      Object.keys(row).forEach((k) => {
        normalizedRow[k.trim()] = row[k];
      });

      const name = (getName(normalizedRow) ?? "").toString().trim();
      const email = (getEmail(normalizedRow) ?? "")
        .toString()
        .trim()
        .toLowerCase();

      if (!name || !email) continue; // Skip header/empty rows

      const matricNo = (
        getMatric(normalizedRow) ??
        pick("Phone", "phone")(normalizedRow) ??
        `MAT-${Date.now()}-${i}`
      )
        .toString()
        .trim();

      const rawAge = getAge(normalizedRow);
      const age =
        rawAge !== undefined && !isNaN(Number(rawAge))
          ? Number(rawAge)
          : undefined;
      const level = (getLevel(normalizedRow) ?? "100").toString().trim();
      const department = (getDepartment(normalizedRow) ?? "General")
        .toString()
        .trim();

      cleanedRows.push({
        name,
        email,
        matricNo,
        level,
        department,
        ...(age !== undefined ? { age } : {}),
      });
    }

    // Drop rows duplicated within the same file (same email or matric).
    // Without this, bulkWrite hits MongoDB's unique indexes and returns a 500,
    // aborting the entire import.
    const seen = new Set();
    for (let i = cleanedRows.length - 1; i >= 0; i--) {
      const r = cleanedRows[i];
      if (seen.has(r.email) || seen.has(r.matricNo)) {
        cleanedRows.splice(i, 1);
      } else {
        seen.add(r.email);
        seen.add(r.matricNo);
      }
    }

    if (cleanedRows.length === 0) {
      return res
        .status(400)
        .json({
          message:
            "No valid rows found. Spreadsheet must contain 'Name' and 'Email'.",
        });
    }

    // 2. Fetch existing students by email or matricNo to avoid $or + upsert MongoDB restrictions
    const emails = cleanedRows.map((r) => r.email);
    const matrics = cleanedRows.map((r) => r.matricNo);

    const existingStudents = await Student.find({
      $or: [{ email: { $in: emails } }, { matricNo: { $in: matrics } }],
    });

    const existingMap = new Map();
    existingStudents.forEach((s) => {
      if (s.email) existingMap.set(s.email.toLowerCase(), s._id);
      if (s.matricNo) existingMap.set(s.matricNo, s._id);
    });

    // 3. Build bulkWrite operations (Update if exists, Insert if new)
    const bulkOps = [];
    cleanedRows.forEach((doc) => {
      const matchId =
        existingMap.get(doc.email) || existingMap.get(doc.matricNo);

      if (matchId) {
        bulkOps.push({
          updateOne: {
            filter: { _id: matchId },
            update: { $set: doc },
          },
        });
      } else {
        bulkOps.push({
          insertOne: {
            document: doc,
          },
        });
      }
    });

    const result = await Student.bulkWrite(bulkOps, { ordered: false });

    res.status(200).json({
      message: `Successfully imported/updated ${cleanedRows.length} students.`,
      count: cleanedRows.length,
      inserted: result.insertedCount,
      modified: result.modifiedCount,
    });
  } catch (error) {
    console.error("Bulk Import Server Error:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to process bulk import." });
  }
});

module.exports = router;
