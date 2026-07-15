const express = require("express")
const validate = require("../middlewares/validate.middleware")
const quizController = require("../controllers/quiz.controller")
const {quizSchema} = require("../validations/quiz.validation")

const quizRouter = express.Router()

quizRouter.post("/", validate(quizSchema), quizController.getRecommendations)

// Export
module.exports = quizRouter