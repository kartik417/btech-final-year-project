const express = require("express");

const router = express.Router();

const {
    getQuestions,
    getQuestionById,
    executeCode
} = require("../controllers/codingController");


//  GET ALL QUESTIONS
router.get("/questions", getQuestions);


//  GET SINGLE QUESTION
router.get("/questions/:id", getQuestionById);


//  RUN CODE
router.post("/run", executeCode);


module.exports = router;