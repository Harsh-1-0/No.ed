  import fs from "fs";
  import path from "path";
  import pdf from "pdf-parse";

  export default async function handler(req, res) {
    try {
      const filePath = path.join(process.cwd(), "public", "RESUME2.pdf");
      console.log(filePath);
      const dataBuffer = fs.readFileSync(filePath);

      const data = await pdf(dataBuffer);

      res.status(200).json({ text: data.text });
    } catch (error) {
      res.status(500).json({ error: `Failed to parse PDF ${error}` });
    }
  }
