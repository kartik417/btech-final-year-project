const questions = require("../data/questions");

const { runCode } = require("../services/codingService");


// ✅ GET ALL QUESTIONS
exports.getQuestions = (req, res) => {

    try {

        let filteredQuestions = questions;

        const { difficulty, topic } = req.query;

        // FILTER BY DIFFICULTY
        if (difficulty) {

            filteredQuestions = filteredQuestions.filter(
                q => q.difficulty === difficulty
            );

        }

        // FILTER BY TOPIC
        if (topic) {

            filteredQuestions = filteredQuestions.filter(
                q => q.topic === topic
            );

        }

        res.status(200).json(filteredQuestions);

    } catch (error) {

        res.status(500).json({
            error: "Failed to fetch questions"
        });

    }

};


// ✅ GET SINGLE QUESTION
exports.getQuestionById = (req, res) => {

    try {

        const id = Number(req.params.id);

        const question = questions.find(
            q => q.id === id
        );

        if (!question) {

            return res.status(404).json({
                error: "Question not found"
            });

        }

        res.status(200).json(question);

    } catch (error) {

        res.status(500).json({
            error: "Error fetching question"
        });

    }

};


// ✅ EXECUTE CODE
exports.executeCode = (req, res) => {

    try {

        const { code, questionId } = req.body;

        // FIND QUESTION
        const question = questions.find(
            q => q.id === Number(questionId)
        );

        if (!question) {

            return res.status(404).json({
                error: "Question not found"
            });

        }

        // RUN CODE
        const result = runCode(code, question);

        res.status(200).json(result);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Execution error"
        });

    }

};