const express = require("express")
const wishlistController = require("../controllers/wishlist.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const wishlistRouter = express.Router()

wishlistRouter.get("/", authMiddleware, wishlistController.getMyWishlist)
wishlistRouter.post("/", authMiddleware, wishlistController.add)
wishlistRouter.delete("/:tourId", authMiddleware, wishlistController.remove)

// Export
module.exports = wishlistRouter