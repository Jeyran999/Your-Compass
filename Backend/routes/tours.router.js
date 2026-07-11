const express = require("express")
const tourController = require("../controllers/tours.controller")
const validate = require("../middlewares/validate.middleware")
const { createTourSchema, updateTourSchema} = require("../validations/tour.validation")
const authMiddleware = require("../middlewares/auth.middleware")
const adminMiddleware = require("../middlewares/admin.middleware")

const tourRouter = express.Router()

// Public routes
tourRouter.get("/", tourController.getAll)
tourRouter.get("/:id", tourController.getOne)

// Admin-only routes 
tourRouter.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validate(createTourSchema),
    tourController.create
)

tourRouter.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateTourSchema),
    tourController.update
)

tourRouter.delete("/:id", authMiddleware, adminMiddleware, tourController.delete)

// Export
module.exports = tourRouter