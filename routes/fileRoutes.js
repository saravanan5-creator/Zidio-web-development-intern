import express from "express";
import File from "../models/File.js";

const router = express.Router();

// Save uploaded file metadata
router.post("/", async (req, res) => {
  const { filename, uploadedAt } = req.body;

  if (!filename || !uploadedAt) {
    return res.status(400).json({ error: "Missing filename or uploadedAt" });
  }

  try {
    const file = new File({ filename, uploadedAt });
    await file.save();
    res.status(201).json({ message: "File saved successfully", file });
  } catch (err) {
    console.error("Failed to save file:", err);
    res.status(500).json({ error: "Failed to save file" });
  }
});

// Get all uploaded file history
router.get("/", async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 }); // recent first
    res.json(files);
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

export default router;
