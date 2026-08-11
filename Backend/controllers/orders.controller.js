const Tour = require("../models/tours.model");
const Order = require("../models/orders.model");

const orderController = {
  // Create new order
  create: async (req, res) => {
    try {
      const { tourId, travelers, cardExpires, travelDate, cardNumber } =
        req.body;

      const tour = await Tour.findById(tourId);
      if (!tour) return res.status(404).json({ message: "Tour not found" });
      const totalPrice = tour.price * travelers;
      const cardLast4 = cardNumber.slice(-4);

      const order = new Order({
        userId: req.user.id,
        tourId,
        travelers,
        totalPrice,
        travelDate,
        cardLast4,
        cardExpires,
      });
      await order.save();
      res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Show user's orders
  getMyOrders: async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.user.id }).populate(
        "tourId",
      );
      res.status(200).json({ orders });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // All orders (only admin)
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const orders = await Order.find()
        .populate("userId", "username email")
        .populate("tourId", "cityName packageTitle")
        .skip(skip)
        .limit(limit);

      const total = await Order.countDocuments();
      res.status(200).json({
        orders,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Change order status (only admin)
  updateStatus: async (req, res) => {
    try {
      const { status } = req.body;

      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true },
      );

      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Cancel order
  cancelOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Can only cancel their own order
      if (order.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      order.status = "cancelled";
      await order.save();

      res.status(200).json({ message: "Order cancelled", order });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Export
module.exports = orderController;
