const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users.router");
const app = express();


// Middleware
app.use(bodyParser.json())

// Routes
app.use("/api/users",userRouter)


mongoose.connect(process.env.URL).then(() => {
  console.log("DB connected");

  app.listen(process.env.PORT, () => {
    console.log("API listened");
  })
  .catch((err) => {
    console.log("DB connection failed: ", err)
    process.exit(1)
  })
});


