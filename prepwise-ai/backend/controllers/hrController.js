const { analyzeAnswer } = require("../services/hrService");

exports.evaluateHR = (req, res) => {
  try {
    const { answer } = req.body;

    const result = analyzeAnswer(answer);

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: "HR evaluation failed" });
  }
};