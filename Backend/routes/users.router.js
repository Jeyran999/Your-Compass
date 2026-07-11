const express = require("express")
const userController = require("../controllers/users.controller")
const {registerSchema, loginSchema} = require("../validations/auth.validation")
const registerLimiter = require("../middlewares/rateLimiter.middleware")
const validate = require("../middlewares/validate.middleware")


const userRouter = express.Router()

userRouter.post("/register" , registerLimiter , validate(registerSchema) ,userController.register)
userRouter.post("/login" , validate(loginSchema) ,userController.login)

// Export
module.exports = userRouter