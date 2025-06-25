import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newFilename, setNewFilename] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/files");
      const data = await res.json();
      setFiles(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching file history:", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/files/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFiles(files.filter((file) => file._id !== id));
      } else {
        alert("Failed to delete file");
      }
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewFilename(files[index].filename);
  };

  const handleSaveEdit = (id) => {
    const updatedFiles = [...files];
    updatedFiles[editingIndex].filename = newFilename;
    setFiles(updatedFiles);

    // Optional: Send PATCH/PUT to backend if needed
    // await fetch(`http://localhost:5000/api/files/${id}`, { method: "PUT", body: ... })

    setEditingIndex(null);
    setNewFilename("");
  };

  return (
    <div className="dashboard">
      <div className="greeting">
        <h1>Hello User!</h1>
      </div>
      
      <h1 className="dashboard-title">📂 Uploaded File History</h1>

      {loading ? (
        <p className="status-text">Loading...</p>
      ) : files.length === 0 ? (
        <p className="status-text">No files uploaded yet.</p>
      ) : (
        <ul className="file-list">
          {files.map((file, index) => (
            <li key={file._id} className="file-item">
              <div>
                {editingIndex === index ? (
                  <input
                    className="edit-input"
                    value={newFilename}
                    onChange={(e) => setNewFilename(e.target.value)}
                  />
                ) : (
                  <span className="file-name">{file.filename}</span>
                )}
                <div className="file-date">
                  {new Date(file.uploadedAt).toLocaleString()}
                </div>
              </div>

              <div className="file-actions">
                {editingIndex === index ? (
                  <button className="save-btn" onClick={() => handleSaveEdit(file._id)}>Save</button>
                ) : (
                  <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => handleDelete(file._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
