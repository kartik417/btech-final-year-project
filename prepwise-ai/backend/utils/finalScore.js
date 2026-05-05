exports.calculateFinalScore = (resumeScore, codingScore) => {
  const finalScore = (0.5 * resumeScore) + (0.5 * codingScore);

  return Math.round(finalScore);
};