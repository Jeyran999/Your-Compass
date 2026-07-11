const Joi = require("joi")
const registerSchema = Joi.object({
  username: Joi.string().trim().lowercase().min(3).max(15).required().pattern(/^[a-zA-Z0-9_]+$/).messages({
    "string.empty": "Username is required",
    "string.min": "Username must be between 3 and 15 characters",
    "string.max": "Username must be between 3 and 15 characters",
    "string.pattern.base": "Username can only contain letters, numbers, and underscores",
    "any.required": "Username is required"
  }),
  email: Joi.string().lowercase().email().required().trim().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required"
  }),
  password: Joi.string().min(8).required().pattern(/[A-Z]/, "uppercase").pattern(/[0-9]/, "number").messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.pattern.name": "Password must contain at least one {#name}",
    "any.required": "Password is required"
  })
})

const loginSchema = Joi.object({
  username: Joi.string().lowercase().trim().required().messages({
    "string.empty": "Username is required",
    "any.required": "Username is required"
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required"
  })
})

// Export
module.exports = {registerSchema, loginSchema}