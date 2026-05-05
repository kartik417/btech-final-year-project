const questions = require("../utils/questions");
const { runCode } = require("../services/codingService");

exports.executeCode = (req, res) => {
  try {
    const { code, questionId } = req.body;

    const question = questions.find(q => q.id === questionId);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    const result = runCode(code, question);

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: "Execution error" });
  }
};