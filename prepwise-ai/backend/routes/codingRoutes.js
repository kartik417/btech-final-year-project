const express = require("express");
const router = express.Router();

const { executeCode } = require("../controllers/codingController");
const questions = require("../utils/questions");

//  ADD THIS (IMPORTANT)
router.get("/questions", (req, res) => {
  res.json(questions);
});

// existing route
router.post("/run", executeCode);

module.exports = router;