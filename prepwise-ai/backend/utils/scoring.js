const roles = {

  mern: [
    "javascript",
    "react",
    "node",
    "express",
    "mongodb"
  ],

  java: [
    "java",
    "spring",
    "hibernate",
    "sql"
  ],

  python: [
    "python",
    "django",
    "flask",
    "pandas"
  ]
};

exports.calculateResumeScore = (
  text,
  role,
  jobDesc
) => {

  // =========================
  // 🔥 BASIC CLEANUP
  // =========================

  text = text?.toLowerCase() || "";

  jobDesc =
    jobDesc?.toLowerCase() || "";

  // =========================
  // 🔥 EMPTY RESUME CHECK
  // =========================

  if (
    !text ||
    text.trim().length < 50
  ) {

    return {

      score: 0,

      level: "Poor",

      foundSkills: [],

      missingSkills: [],

      atsScore: 0,

      hasProjects: false,

      hasExperience: false,

      suggestions: [
        "Resume content is too small or unreadable"
      ],

      sectionScores: {
        skills: 0,
        ats: 0,
        projects: 0,
        experience: 0,
        structure: 0
      }
    };
  }

  // =========================
  // 🔥 ROLE SKILLS
  // =========================

  const roleSkills =
    roles[role] || roles.mern;

  let foundSkills = [];

  let missingSkills = [];

  let score = 0;

  // =========================
  // 🔥 1. SKILL MATCH (35)
  // =========================

  roleSkills.forEach(skill => {

    const hasSkill =
      new RegExp(
        `\\b${skill}\\b`,
        "i"
      ).test(text);

    if (hasSkill) {

      foundSkills.push(skill);

    } else {

      missingSkills.push(skill);
    }
  });

  const skillScore =
    Math.round(
      (
        foundSkills.length /
        roleSkills.length
      ) * 35
    );

  score += skillScore;

  // =========================
  // 🔥 2. PROJECTS (20)
  // =========================

  const hasProjects =

    text.includes("project") ||

    text.includes("projects");

  let projectScore = 0;

  if (hasProjects) {

    projectScore = 20;

    score += projectScore;
  }

  // =========================
  // 🔥 3. EXPERIENCE (20)
  // =========================

  const hasExperience =

    text.includes("experience") ||

    text.includes("internship");

  let experienceScore = 0;

  if (hasExperience) {

    experienceScore = 20;

    score += experienceScore;
  }

  // =========================
  // 🔥 4. ATS MATCH (15)
  // =========================

  let atsScore = 0;

  let atsMarks = 0;

  if (jobDesc) {

    const ignoredWords = [

      "with",
      "from",
      "have",
      "your",
      "that",
      "this",
      "will",
      "their",
      "about",
      "should"
    ];

    const jdWords = [

      ...new Set(

        jobDesc
          .split(/\W+/)

          .filter(word =>

            word.length > 3 &&

            !ignoredWords.includes(word)
          )
      )
    ];

    let matchCount = 0;

    jdWords.forEach(word => {

      const matched =
        new RegExp(
          `\\b${word}\\b`,
          "i"
        ).test(text);

      if (matched) {
        matchCount++;
      }
    });

    if (jdWords.length > 0) {

      atsScore = Math.round(
        (matchCount / jdWords.length) * 100
      );

      atsMarks = Math.round(
        (atsScore / 100) * 15
      );

      score += atsMarks;
    }
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

      (
        structureChecks.filter(Boolean)
          .length / 4
      ) * 10
    );

  score += structureScore;

  // =========================
  // 🔥 BONUS CHECKS
  // =========================

  const hasGithub =
    text.includes("github");

  const hasLinkedin =
    text.includes("linkedin");

  const hasPortfolio =
    text.includes("portfolio");

  if (hasGithub) {
    score += 5;
  }

  if (hasLinkedin) {
    score += 3;
  }

  if (hasPortfolio) {
    score += 5;
  }

  // =========================
  // 🔥 ACHIEVEMENT CHECK
  // =========================

  const hasNumbers =
    /\d+%|\d+\+|\d+x/g.test(text);

  if (hasNumbers) {
    score += 5;
  }

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

  if (!hasGithub) {

    suggestions.push(
      "Add GitHub profile link"
    );
  }

  if (!hasLinkedin) {

    suggestions.push(
      "Add LinkedIn profile link"
    );
  }

  if (!hasPortfolio) {

    suggestions.push(
      "Add portfolio or deployed project links"
    );
  }

  if (!hasNumbers) {

    suggestions.push(
      "Add measurable achievements and impact"
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

  let level = "Beginner";

  if (score >= 90) {

    level = "Outstanding";

  } else if (score >= 75) {

    level = "Professional";

  } else if (score >= 60) {

    level = "Intermediate";
  }

  // =========================
  // 🔥 FINAL RESPONSE
  // =========================

  return {

    score,

    level,

    foundSkills,

    missingSkills,

    atsScore,

    hasProjects,

    hasExperience,

    suggestions,

    sectionScores: {

      skills: skillScore,

      ats: atsMarks,

      projects: projectScore,

      experience: experienceScore,

      structure: structureScore
    }
  };
};