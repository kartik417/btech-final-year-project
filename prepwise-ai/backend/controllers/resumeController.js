const {
  processResume
} = require("../services/resumeService");

const validRoles = [
  "mern",
  "java",
  "python"
];

exports.uploadResume = async (req, res) => {

  try {

    //  FILE CHECK
    if (!req.file) {

      return res.status(400).json({
        error: "Resume file is required"
      });
    }

    const { role, jobDesc } = req.body;

    //  ROLE VALIDATION
    if (!validRoles.includes(role)) {

      return res.status(400).json({
        error: "Invalid role selected"
      });
    }

    const filePath = req.file.path;

    const result = await processResume(
      filePath,
      role,
      jobDesc
    );

    res.json(result);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error:
        err.message ||
        "Resume processing failed"
    });
  }
};