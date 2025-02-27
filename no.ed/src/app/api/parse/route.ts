"use server";
import fs from "fs";
import path from "path";
import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = path.resolve("public", "Harsh_Kumar_Sinha_Resume.pdf");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileBuffer = await fs.promises.readFile(filePath);
    const pdfExtract = new PDFExtract();
    const options: PDFExtractOptions = {}; // You can customize options if needed
    const data = await pdfExtract.extractBuffer(fileBuffer, options);

    return NextResponse.json({ text: "data" }, { status: 200 });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}
