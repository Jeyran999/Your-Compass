const Joi = require("joi");

const createTourSchema = Joi.object({
  cityName: Joi.string().required().trim().min(2).max(50).messages({
    "string.empty": "City name is required",
    "any.required": "City name is required",
  }),
  packageTitle: Joi.string().trim().min(5).max(100).required().messages({
    "string.empty": "Package title is required",
    "any.required": "Package title is required",
  }),
  description: Joi.string().trim().min(20).messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  images: Joi.array().items(
    Joi.string().uri().min(1).required().messages({
      "array.min": "At least one image is required",
      "any.required": "Images are required",
    }),
  ),
  price: Joi.number().min(0).required().messages({
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),
  duration: Joi.number().integer().min(1).required().messages({
    "number.min": "Duration must be at least 1 day",
    "any.required": "Duration is required",
  }),
  climate: Joi.string().valid("hot", "cold", "moderate").required(),
  foodType: Joi.string()
    .valid("spicy", "mild", "seafood", "vegetarian-friendly", "diverse")
    .required(),
  activityType: Joi.string()
    .valid("beach", "adventure", "cultural", "relaxation", "nature")
    .required(),
  cityVibe: Joi.string().valid("historic", "modern").required(),
  budget: Joi.string().valid("cheap", "moderate", "expensive").required(),
  availableDates: Joi.array().items(Joi.date()).optional(),
});

const updateTourSchema = createTourSchema.fork(
  [
    "cityName",
    "packageTitle",
    "description",
    "images",
    "price",
    "duration",
    "climate",
    "foodType",
    "activityType",
    "cityVibe",
    "budget",
  ],
  (schema) => schema.optional(),
);

module.exports = {createTourSchema, updateTourSchema}