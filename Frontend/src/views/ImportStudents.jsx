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
        const buf = e.target.result; // ArrayBuffer

        // XML "spreadsheets" are text (Excel SpreadsheetML 2003). Decode the
        // bytes into a real string first so UTF-8 BOM / UTF-16 files aren't
        // mangled (readAsBinaryString + type:"array" both fail on UTF-16 XML).
        let workbook;
        if (/\.xml$/i.test(file.name)) {
          const bytes = new Uint8Array(buf);
          let text;
          if (bytes[0] === 0xff && bytes[1] === 0xfe) {
            text = new TextDecoder("utf-16le").decode(bytes);
          } else if (bytes[0] === 0xfe && bytes[1] === 0xff) {
            text = new TextDecoder("utf-16be").decode(bytes);
          } else {
            text = new TextDecoder("utf-8").decode(bytes); // strips BOM
          }
          workbook = XLSX.read(text, { type: "string" });
        } else {
          // .xlsx / .xls / .csv — let SheetJS detect the binary format
          workbook = XLSX.read(buf, { type: "array" });
        }

        // Grab the first sheet in the spreadsheet
        const worksheetName = workbook.SheetNames[0];
        if (!worksheetName) {
          throw new Error(
            "No sheets found. XML files must be Excel 'XML Spreadsheet 2003' format.",
          );
        }
        const worksheet = workbook.Sheets[worksheetName];

        // Convert rows to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        if (jsonData.length === 0) {
          throw new Error("The spreadsheet contains no data rows.");
        }

        // Send to your Express backend
        const response = await axios.post(
          "https://sms-project-ots.onrender.com/api/students/bulk",
          jsonData,
        );
        alert(`${response.data.count} students imported successfully!`);
      } catch (err) {
        console.error("Import Error:", err);
        // Show the real reason (e.g. the backend's 400 message) instead of
        // a generic alert, so import failures are actually diagnosable.
        alert(
          err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Failed to parse or import spreadsheet.",
        );
      } finally {
        setLoading(false);
        e.target.value = "";
      }
    };

    reader.onerror = () => {
      setLoading(false);
      alert("Could not read the selected file.");
    };

    // readAsArrayBuffer is the SheetJS-recommended path (readAsBinaryString
    // is unreliable, especially for XML / UTF-16 content).
    reader.readAsArrayBuffer(file);
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
