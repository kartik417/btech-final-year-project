const { processResume } = require("../services/resumeService");

// exports.uploadResume = async (req, res) => {
//   try {
//     // 🔍 Step 1: check file
//     console.log("FILE DATA:", req.file);

//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const filePath = req.file.path;

//     console.log("FILE PATH:", filePath);

//     // 🔍 Step 2: process resume
//     const result = await processResume(filePath);

//     console.log("RESULT:", result);

//     res.json({
//       success: true,
//       ...result,
//       message: "Resume analyzed successfully",
//     });

//   } catch (err) {
//     console.error("❌ ERROR:", err);  // 👈 MOST IMPORTANT

//     res.status(500).json({
//       error: "Resume processing failed",
//       details: err.message, // 👈 real error frontend pe bhi dikhega
//     });
//   }
// };

exports.uploadResume = async (req, res) => {
  try {
    const filePath = req.file.path;
    const { role, jobDesc } = req.body;

    const result = await processResume(filePath, role, jobDesc);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Resume processing failed" });
  }
};