const Joi = require("joi");

const createOrderSchema = Joi.object({
  tourId: Joi.string().required().messages({
    "any.required": "Tour ID is required",
  }),
  travelers: Joi.number().min(1).required().messages({
    "any.required": "Number of travelers is required",
    "number.min": "At least 1 traveler is required",
  }),
  travelDate: Joi.date().required().messages({
    "any.required": "Travel date is required",
    "date.greater": "Travel date must be in the future",
  }),
  cardNumber: Joi.string()
    .required()
    .pattern(/^\d{16}$/)
    .messages({
      "any.required": "Card number is required",
      "string.pattern.base": "Card number must be exactly 16 digits",
    }),
  cardExpires: Joi.string()
    .pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Card expiry must be in MM/YY format",
      "any.required": "Card expiry is required",
    }),
  cardCVV: Joi.string()
    .pattern(/^\d{3}$/)
    .required()
    .messages({
      "string.pattern.base": "CVV must be exactly 3 digits",
      "any.required": "CVV is required",
    }),
});

// Export
module.exports = {createOrderSchema}