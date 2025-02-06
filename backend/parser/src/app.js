import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import PDFParser from "pdf2json";

const app = express();
const port = 8080;

app.use(cors({ origin: "*" }));

// Store files temporarily in 'uploads' directory
const upload = multer({ dest: "uploads/" });

app.post("/pdfparse", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfParser = new PDFParser();

    pdfParser.loadPDF(req.file.path);

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let extractedText = pdfData.Pages.map((page) =>
        page.Texts.map((text) => decodeURIComponent(text.R[0].T)).join(" ")
      ).join("\n");

      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });

      res.json({
        data: extractedText,
      });
    });

    pdfParser.on("pdfParser_dataError", (err) => {
      fs.unlink(req.file.path, () => {});
      res.status(500).json({ error: err.parserError });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
