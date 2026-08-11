const express = require("express")
const orderController = require("../controllers/orders.controller")
const {createOrderSchema} = require("../validations/order.validation")
const authMiddleware = require("../middlewares/auth.middleware")
const adminMiddleware = require("../middlewares/admin.middleware")
const validate = require("../middlewares/validate.middleware")

const orderRouter = express.Router()

// Users' routes (login is required)
orderRouter.post("/", authMiddleware, validate(createOrderSchema), orderController.create) // Creating order
orderRouter.get("/my-orders", authMiddleware, orderController.getMyOrders) // showing user's orders
orderRouter.put("/:id/cancel", authMiddleware, orderController.cancelOrder) // cancel order

// Admin's routes
orderRouter.get("/", authMiddleware, adminMiddleware, orderController.getAll) // showing all orders 
orderRouter.put("/:id/status", authMiddleware, adminMiddleware, orderController.updateStatus) // updating order's status

// Export
module.exports = orderRouter