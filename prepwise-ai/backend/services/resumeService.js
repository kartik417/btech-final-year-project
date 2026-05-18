const fs = require("fs");

const pdfParse = require("pdf-parse");

const mammoth = require("mammoth");

const {
  calculateResumeScore
} = require("../utils/scoring");

exports.processResume = async (
  filePath,
  role,
  jobDesc
) => {

  let text = "";

  // =========================
  // 🔥 PDF SUPPORT
  // =========================

  if (filePath.endsWith(".pdf")) {

    const buffer =
      fs.readFileSync(filePath);

    const data =
      await pdfParse(buffer);

    text = data.text;
  }

  // =========================
  // 🔥 DOCX SUPPORT
  // =========================

  else if (
    filePath.endsWith(".docx")
  ) {

    const result =
      await mammoth.extractRawText({

        path: filePath
      });

    text = result.value;
  }

  // =========================
  // 🔥 DOC SUPPORT
  // =========================

  else if (
    filePath.endsWith(".doc")
  ) {

    throw new Error(
      "DOC files are not supported yet. Please upload PDF or DOCX."
    );
  }

  // =========================
  // 🔥 INVALID FORMAT
  // =========================

  else {

    throw new Error(
      "Unsupported file format"
    );
  }

  // =========================
  // 🔥 CLEAN TEXT
  // =========================

  text = text.toLowerCase().trim();

  // =========================
  // 🔥 EMPTY TEXT CHECK
  // =========================

  if (!text || text.length < 50) {

    throw new Error(
      "Resume text could not be extracted properly"
    );
  }

  // console.log(text);

  return calculateResumeScore(
    text,
    role,
    jobDesc
  );
};