const Joi = require("joi");

const quizSchema = Joi.object({
  climate: Joi.string().valid("hot", "cold", "moderate").required(),
  foodType: Joi.string()
    .valid("spicy", "mild", "seafood", "vegetarian-friendly", "diverse")
    .required(),
  activityType: Joi.string()
    .valid("beach", "adventure", "cultural", "relaxation", "nature")
    .required(),
  cityVibe: Joi.string().valid("historic", "modern", "any").required(),
  budget: Joi.string().valid("cheap", "moderate", "expensive").required(),
});

// Export
module.exports = { quizSchema };
