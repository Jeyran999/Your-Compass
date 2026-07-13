const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    travelers: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    travelDate: {
      type: Date,
      required: true,
    },
    cardLast4: {
      type: String,
      required: true,
      match: [/^\d{4}$/, "Must be exactly 4 digits"],
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",     
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema)

// Export
module.exports = Order