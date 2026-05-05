const roles = {
  mern: ["javascript", "react", "node", "express", "mongodb"],
  java: ["java", "spring", "hibernate", "sql"],
  python: ["python", "django", "flask", "pandas"]
};

exports.calculateResumeScore = (text, role, jobDesc) => {
  text = text.toLowerCase();
  jobDesc = jobDesc?.toLowerCase() || "";

  let score = 0;

  const roleSkills = roles[role] || roles.mern;

  let foundSkills = [];
  let missingSkills = [];

  roleSkills.forEach(skill => {
    if (text.includes(skill)) {
      foundSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // 🔥 ATS Match (JD vs Resume)
  let matchCount = 0;
  const jdWords = jobDesc.split(" ").filter(w => w.length > 3);

  jdWords.forEach(word => {
    if (text.includes(word)) matchCount++;
  });

  const atsScore = jobDesc
    ? Math.round((matchCount / jdWords.length) * 100)
    : 0;

  // 🔥 Section detection
  const hasProjects = text.includes("project");
  const hasExperience = text.includes("experience");

  // 🔥 Base scoring
  score += foundSkills.length * 10;
  score += hasProjects ? 20 : 0;
  score += hasExperience ? 20 : 0;

  if (score > 100) score = 100;

  // 🔥 Suggestions
  let suggestions = [];

  if (!hasProjects) suggestions.push("Add Projects section");
  if (!hasExperience) suggestions.push("Add Experience section");
  if (missingSkills.length > 0)
    suggestions.push("Add missing role-specific skills");

  return {
    score,
    foundSkills,
    missingSkills,
    atsScore,
    hasProjects,
    hasExperience,
    suggestions
  };
};