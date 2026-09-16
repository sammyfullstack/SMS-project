// ReportsView — placeholder Reports screen (route /reports).
// The export buttons below are not wired up yet; they only preview the layout.
import { useState } from "react";
import axios from "axios";
import papa from "papaparse";
import { getStyles } from "../styles";
import ImportStudents from "./ImportStudents";

export default function ReportsView({ theme }) {
  const styles = getStyles(theme);
  const [exporting, setExporting] = useState(false);

  const handleExportCSV = async () => {
    try {
      setExporting(true);
      //set all student records from Express backend
      const res = await axios.get("http://localhost:5000/api/students");
      const students = res.data;

      if (!students || students.length === 0) {
        alert("No student data available to export.");
        return;
      }

      //convert JSON array to CSV format
      const csv = papa.unparse(students);

      //Create a blovb and force browser download
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `student_report_${new Date().toISOString().split("T")[0]}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export student records.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div style={styles.cardContainer}>
      <h3 style={{ margin: "0 0 8px 0", fontSize: 16 }}>
        System Metrics & Reports
      </h3>
      <p style={styles.reportText}>
        Summary data exportable for administrative review.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button
          className="report-btn"
          onClick={handleExportCSV}
          disabled={exporting}
          style={styles.primarySearchBtn}
        >
          {exporting ? "Geneating CSV..." : "Export CSV Summary"}
        </button>

        <ImportStudents styles={styles} />
      </div>
    </div>
  );
}
