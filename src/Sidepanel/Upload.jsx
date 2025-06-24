import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as XLSX from "xlsx";
import "./Upload.css";

function Upload() {
  const [fileName, setFileName] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = async (evt) => {
      try {
        const arrayBuffer = evt.target.result;
        const binary = new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        );

        const workbook = XLSX.read(binary, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        setExcelData(jsonData);
        setIsFileUploaded(true);

        // ✅ Save metadata
        const response = await fetch("http://localhost:5000/api/files", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            uploadedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Server responded with an error");
        }

        const result = await response.json();
        console.log("✅ File metadata saved:", result);
      } catch (err) {
        console.error("❌ Failed to save file metadata:", err);
        alert("Failed to connect to server. Make sure backend is running.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleExportChart = () => {
    if (!excelData.length) return;
    navigate("/dashboardlayout/chart", {
      state: {
        data: excelData,
        fileName,
      },
    });
  };

  return (
    <div className="Btn">
      <h2>Upload Your Excel File</h2>

      <input type="file" id="uploadBtn" onChange={handleFileUpload} />
      <label htmlFor="uploadBtn" className="upload-label">📁 Upload</label>

      {fileName && <p className="file-name">Selected file: {fileName}</p>}

      {isFileUploaded && (
        <button className="export-btn" onClick={handleExportChart}>
          📊 Export as Chart
        </button>
      )}
    </div>
  );
}

export default Upload;
