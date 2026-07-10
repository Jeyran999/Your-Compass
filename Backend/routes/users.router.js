const express = require("express")
const userController = require("../controllers/users.controller")
const authValidation = require("../validations/auth.validation")

const userRouter = express.Router()

userRouter.post("/register" , authValidation.register ,userController.register)

module.exports = userRouter