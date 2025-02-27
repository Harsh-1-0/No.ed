"use client";
import { useEffect, useState } from "react";
import axios from "axios";

function PdfParsing() {
  const [pdfData, setPdfData] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/api/parsePdf")
      .then((response) => {
        setPdfData(response.data.text || "Error parsing PDF");
      })
      .catch((error) => {
        console.error("Error fetching PDF data:", error);
        setPdfData("Error fetching PDF data");
      });
  }, []);

  return <div>{pdfData || "Loading..."}</div>;
}

export default PdfParsing;
