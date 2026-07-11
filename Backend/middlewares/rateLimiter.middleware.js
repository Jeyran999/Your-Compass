const rateLimit = require("express-rate-limit")

// Bot spam registrations are being recovered.
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 100, // 15 minutes
    max: 5, // max 5 register tries from per IP
    message: {message: "too many account created, please try again later"}
})

// Export
module.exports = registerLimiter