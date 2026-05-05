const express = require("express");
const router = express.Router();
const { evaluateHR } = require("../controllers/hrController");

router.post("/analyze", evaluateHR);

module.exports = router;