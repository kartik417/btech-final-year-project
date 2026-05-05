const express = require("express");
const router = express.Router();
const { getFinalEvaluation } = require("../controllers/evaluationController");

router.post("/final", getFinalEvaluation);

module.exports = router;