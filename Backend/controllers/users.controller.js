const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const userController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const SALT_ROUNDS = 10;
      
      // Checking user exists or not
      const existingUser = await User.findOne({ username });
      if (existingUser)
        return res.status(409).json({ message: "User already exists" });

      // Hash password and create a new user
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // hash user's password
      const user = new User({ username, password: hashedPassword });
      await user.save();

      res.status(201).json({
        message: "User created successfully",
      });
    } catch (error) {
      // Handle duplicate key error from MongoDB unique index
      if (error.code === 11000) {
        return res.status(409).json({ message: "User already exists" });
      }
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userController;
