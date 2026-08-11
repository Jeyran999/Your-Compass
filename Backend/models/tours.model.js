const { required } = require("joi");
const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
      trim: true,
    },
    packageTitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one image is required",
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    climate: {
      type: String,
      enum: ["hot", "cold", "moderate"],
      required: true,
    },
    foodType: {
      type: String,
      enum: ["spicy", "mild", "seafood", "vegetarian-friendly", "diverse"],
      required: true,
    },
    activityType: {
      type: String,
      enum: ["beach", "adventure", "cultural", "relaxation", "nature"],
      required: true,
    },
    cityVibe: {
      type: String,
      enum: ["historic", "modern"],
      required: true,
    },
    budget: {
      type: String,
      enum: ["cheap", "moderate", "expensive"],
      required: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    availableDates: {
      type: [Date],
      default: [],
    },
  },
  { timestamps: true },
);

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
