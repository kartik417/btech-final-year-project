const { calculateFinalScore } = require("../utils/finalScore");

exports.getFinalEvaluation = (req, res) => {
  try {
    const { resumeScore, codingScore } = req.body;

    const finalScore = calculateFinalScore(resumeScore, codingScore);

    let level = "";

    if (finalScore >= 80) level = "Ready";
    else if (finalScore >= 50) level = "Average";
    else level = "Needs Improvement";

    res.json({
      finalScore,
      level
    });

  } catch (err) {
    res.status(500).json({ error: "Evaluation failed" });
  }
};