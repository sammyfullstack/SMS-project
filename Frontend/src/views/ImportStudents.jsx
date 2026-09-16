import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

export default function ImportStudents({ styles }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        // Read the file buffer (handles .xml, .xlsx, .xls, .csv automatically)
        const bstr = e.target.result;
        const workbook = XLSX.read(bstr, { type: "binary" });

        // Grab the first sheet in the spreadsheet
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        // Convert rows to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Send to your Express backend
        const response = await axios.post(
          "http://localhost:5000/api/students/bulk",
          jsonData,
        );
        alert(`${response.data.count} students imported successfully!`);
      } catch (err) {
        console.error("XML Import Error:", err);
        alert("Failed to parse or import spreadsheet.");
      } finally {
        setLoading(false);
        e.target.value = "";
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        accept=".xml, .xlsx, .xls, .csv"
        onChange={handleFileUpload}
        disabled={loading}
        style={{ display: "none" }}
      />
      <button
        className="import-btn"
        type="button"
        onClick={handleButtonClick}
        disabled={loading}
        style={styles?.drawerCancelBtn}
      >
        {loading ? "importing..." : "Import XML / Excell"}
      </button>
    </>
  );
}
