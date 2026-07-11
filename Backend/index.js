const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/users.router");
const sanitizeMiddleware = require("./middlewares/sanitize.middleware")
const app = express();


app.use(express.json())
app.use(sanitizeMiddleware) // Remove dangerous keys


// Routes
app.use("/users",userRouter)


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


