const express = require("express");

const router = express.Router();

router.post("/analyze", (req, res) => {

  const { answer } = req.body;

  const fillerList = [
    "umm",
    "uh",
    "like",
    "actually",
    "basically"
  ];

  let fillerCount = 0;

  fillerList.forEach(word => {

    if(answer.toLowerCase().includes(word)){

      fillerCount++;
    }
  });

  const confidence =
    Math.max(
      40,
      100 - fillerCount * 10
    );

  const wordCount =
    answer.split(" ").length;

  const speakingSpeed =
    wordCount + " WPM";

  const keywords = [];

  const techWords = [
    "javascript",
    "react",
    "node",
    "mongodb",
    "api"
  ];

  techWords.forEach(word => {

    if(answer.toLowerCase().includes(word)){

      keywords.push(word);
    }
  });

  res.json({

    confidence,

    grammar:
      wordCount > 30
        ? "Good"
        : "Average",

    speakingSpeed,

    fillerWords: fillerCount,

    keywords
  });
});

module.exports = router;