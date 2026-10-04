// DepartmentsView — "Departments Breakdown" grid (route /departments).
// `departmentsInUse` merges the static DEPARTMENTS constant with any
// departments that appear on existing student records.
import React, { useState } from "react";
import { getStyles } from "../styles";

export default function DepartmentsView({ departmentsInUse, students, theme }) {
  const styles = getStyles(theme);
  const [selectedDept, setSelectedDept] = useState(null);

  // 1. Normalize casing & deduplicate department names
  const uniqueDepartments = Array.from(
    new Set(
      (departmentsInUse || []).map((d) => {
        if (!d) return "";
        const clean = d.trim();
        return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
      }),
    ),
  ).filter(Boolean);

  // Filter students matching selected department
  const deptStudents = selectedDept
    ? students.filter(
        (s) =>
          (s.department || s.Department || "").trim().toLowerCase() ===
          selectedDept.trim().toLowerCase(),
      )
    : [];

  return (
    <div style={styles.cardContainer}>
      {selectedDept ? (
        /* Enrolled Students View */
        <div>
          <button
            type="button"
            onClick={() => setSelectedDept(null)}
            style={{
              background: "transparent",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              marginBottom: 16,
              padding: 0,
            }}
          >
            ← Back to Departments
          </button>

          <h3 style={{ margin: "0 0 4px 0", fontSize: 18 }}>
            {selectedDept} Department
          </h3>
          <p style={{ margin: "0 0 16px 0", fontSize: 13, color: "#64748b" }}>
            {deptStudents.length} student{deptStudents.length === 1 ? "" : "s"}{" "}
            enrolled
          </p>

          <table
            style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}
          >
            <thead>
              <tr
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid rgba(226, 232, 240, 0.3)",
                }}
              >
                <th style={{ padding: "10px 8px" }}>#</th>
                <th style={{ padding: "10px 8px" }}>Name</th>
                <th style={{ padding: "10px 8px" }}>Matric No.</th>
                <th style={{ padding: "10px 8px" }}>Level</th>
                <th style={{ padding: "10px 8px" }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {deptStudents.map((s, idx) => (
                <tr
                  key={s._id || idx}
                  style={{ borderBottom: "1px solid rgba(241, 245, 249, 0.2)" }}
                >
                  <td style={{ padding: "10px 8px" }}>{idx + 1}</td>
                  <td style={{ padding: "10px 8px", fontWeight: 600 }}>
                    {s.name || s.Name}
                  </td>
                  <td style={{ padding: "10px 8px" }}>
                    {s.matricNo || s.matricNo || "N/A"}
                  </td>
                  <td style={{ padding: "10px 8px" }}>
                    {s.level || s.Level || "N/A"}
                  </td>
                  <td style={{ padding: "10px 8px" }}>{s.email || s.Email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Department Grid View */
        <>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16 }}>
            Departments Breakdown
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 14,
            }}
          >
            {uniqueDepartments.map((d) => {
              // Count students for this department regardless of initial casing
              const count = students.filter(
                (s) =>
                  (s.department || s.Department || "").trim().toLowerCase() ===
                  d.toLowerCase(),
              ).length;

              return (
                <div
                  key={d}
                  onClick={() => setSelectedDept(d)}
                  className="dept-card-hover"
                  style={{
                    ...styles.deptCard,
                    cursor: "pointer",
                  }}
                >
                  <div style={styles.deptCardTitle}>{d}</div>
                  <div style={styles.deptCardSubtext}>
                    {count} student{count === 1 ? "" : "s"} enrolled
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
