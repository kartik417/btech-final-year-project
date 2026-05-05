const Sentiment = require("sentiment");
const sentiment = new Sentiment();

exports.analyzeAnswer = (text) => {
  let score = 0;

  // 🔹 Length check
  if (text.length > 100) score += 40;
  else score += 20;

  // 🔹 Sentiment check
  const result = sentiment.analyze(text);

  if (result.score > 0) score += 40;
  else score += 20;

  // 🔹 Keyword presence
  if (text.includes("experience") || text.includes("skills")) {
    score += 20;
  }

  if (score > 100) score = 100;

  return {
    score,
    sentimentScore: result.score,
  };
};