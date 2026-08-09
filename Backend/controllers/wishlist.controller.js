const User = require("../models/users.model");
const Tour = require("../models/tours.model");

const wishlistController = {
  // Add tour to wishlist
  add: async (req, res) => {
    try {
      const { tourId } = req.body;

      // Checking tour exists or not
      const tour = await Tour.findById(tourId);
      if (!tour) return res.status(404).json({ message: "Tour not found" });

      const user = await User.findById(req.user.id);

      // Checking tour exists in wishlist or not
      if (user.wishlist.includes(tourId))
        return res.status(409).json({ message: "Tour already exists" });

      user.wishlist.push(tourId);
      await user.save();

      res
        .status(200)
        .json({ message: "Added to wishlist", wishlist: user.wishlist });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Remove tour from wishlist
  remove: async (req, res) => {
    try {
      const { tourId } = req.params;
      const user = await User.findById(req.user.id);
      user.wishlist = user.wishlist.filter((id) => id.toString() !== tourId);

      await user.save();

      res.status(200).json({
        message: "Removed from wishlist",
        wishlist: user.wishlist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Show user's wishlist
  getMyWishlist: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate("wishlist");
      res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Export
module.exports = wishlistController;
