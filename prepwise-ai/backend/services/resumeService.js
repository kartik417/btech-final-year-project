const fs = require("fs");
const pdfParse = require("pdf-parse");
const { calculateResumeScore } = require("../utils/scoring");

exports.processResume = async (filePath, role, jobDesc) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);

  const text = data.text.toLowerCase();

  return calculateResumeScore(text, role, jobDesc);
};