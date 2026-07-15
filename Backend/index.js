const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/users.router");
const tourRouter = require("./routes/tours.router")
const sanitizeMiddleware = require("./middlewares/sanitize.middleware");
const wishlistRouter = require("./routes/wishlists.router");
const orderRouter = require("./routes/orders.router");
const quizRouter = require("./routes/quiz.router");
const app = express();


app.use(express.json())
app.use(sanitizeMiddleware) // Remove dangerous keys


// Routes
app.use("/users", userRouter)
app.use("/tours", tourRouter)
app.use("/wishlist", wishlistRouter)
app.use("/orders", orderRouter)
app.use("/quiz", quizRouter)

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("DB connected");

    app.listen(process.env.PORT, () => {
      console.log("API listened");
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });


