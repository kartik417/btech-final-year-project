const roles = {
  mern: ["javascript", "react", "node", "express", "mongodb"],
  java: ["java", "spring", "hibernate", "sql"],
  python: ["python", "django", "flask", "pandas"]
};

exports.calculateResumeScore = (text, role, jobDesc) => {

  text = text.toLowerCase();
  jobDesc = jobDesc?.toLowerCase() || "";

  const roleSkills = roles[role] || roles.mern;

  let foundSkills = [];
  let missingSkills = [];

  let score = 0;

  // =========================
  // 🔥 1. SKILL MATCH (35)
  // =========================

  roleSkills.forEach(skill => {
    if (text.includes(skill)) {
      foundSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const skillScore =
    Math.round((foundSkills.length / roleSkills.length) * 35);

  score += skillScore;

  // =========================
  // 🔥 2. PROJECTS (20)
  // =========================

  const hasProjects =
    text.includes("project") ||
    text.includes("projects");

  if (hasProjects) {
    score += 20;
  }

  // =========================
  // 🔥 3. EXPERIENCE (20)
  // =========================

  const hasExperience =
    text.includes("experience") ||
    text.includes("internship");

  if (hasExperience) {
    score += 20;
  }

  // =========================
  // 🔥 4. ATS MATCH (15)
  // =========================

  let atsScore = 0;

  if (jobDesc) {

    const jdWords = [
      ...new Set(
        jobDesc
          .split(/\W+/)
          .filter(word => word.length > 3)
      )
    ];

    let matchCount = 0;

    jdWords.forEach(word => {
      if (text.includes(word)) {
        matchCount++;
      }
    });

    atsScore =
      Math.round((matchCount / jdWords.length) * 100);

    const atsMarks =
      Math.round((atsScore / 100) * 15);

    score += atsMarks;
  }

  // =========================
  // 🔥 5. RESUME STRUCTURE (10)
  // =========================

  const hasEducation =
    text.includes("education");

  const hasSkillsSection =
    text.includes("skills");

  const structureChecks = [
    hasEducation,
    hasSkillsSection,
    hasProjects,
    hasExperience
  ];

  const structureScore =
    Math.round(
      (structureChecks.filter(Boolean).length / 4) * 10
    );

  score += structureScore;

  // =========================
  // 🔥 LIMIT SCORE
  // =========================

  if (score > 100) {
    score = 100;
  }

  // =========================
  // 🔥 SUGGESTIONS
  // =========================

  let suggestions = [];

  if (!hasProjects) {
    suggestions.push(
      "Add strong technical projects"
    );
  }

  if (!hasExperience) {
    suggestions.push(
      "Add internship or experience section"
    );
  }

  if (missingSkills.length > 0) {
    suggestions.push(
      `Add missing skills: ${missingSkills.join(", ")}`
    );
  }

  if (!hasEducation) {
    suggestions.push(
      "Add education section"
    );
  }

  if (score < 60) {
    suggestions.push(
      "Resume needs better ATS optimization"
    );
  }

  // =========================
  // 🔥 RESUME LEVEL
  // =========================

  let level = "Average";

  if (score >= 85) {
    level = "Excellent";
  } else if (score >= 70) {
    level = "Good";
  }

  return {
    score,
    level,
    foundSkills,
    missingSkills,
    atsScore,
    hasProjects,
    hasExperience,
    suggestions
  };
};