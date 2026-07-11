const Tour = require("../models/tours.model");
const tourController = {
  create: async (req, res) => {
    try {
      const tour = new Tour(req.body);
      await tour.save();

      res.status(201).json({ message: "Tour created successfully", tour });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // getAll function with pagination
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // show page 1 as default
      const limit = parseInt(req.query.limit) || 12; // show 12 tours as default in 1 page
      const skip = (page - 1) * limit;

      const tours = await Tour.find().skip(skip).limit(limit);
      const total = await Tour.countDocuments();

      res.status(200).json({
        tours,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalTours: total,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getOne: async (req, res) => {
    try {
      const tour = await Tour.findById(req.params.id);
      if (!tour) return res.status(404).json({ message: "Tour not found" });

      res.status(200).json({ tour });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    try {
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!tour) return res.status(404).json({ message: "Tour not found" });
      res.status(200).json({ message: "Tour updated successfully", tour });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  delete: async (req, res) => {
    try {
      const tour = await Tour.findByIdAndDelete(req.params.id);
      if (!tour) return res.status(404).json({ message: "Tour not found" });
      res.status(200).json({ message: "Tour deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

// Export
module.exports = tourController