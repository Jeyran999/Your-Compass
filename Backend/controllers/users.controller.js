const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const SALT_ROUNDS = 10;

      // Checking user exists or not
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        const field = existingUser.username === username ? "Username" : "Email";
        return res.status(409).json({ message: `${field} already exists` });
      }

      // Hash password and create a new user
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // hash user's password
      const user = new User({ username, email, password: hashedPassword });
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
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Checking user exists or not
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Checking user's password is true or not
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Export
module.exports = userController;
