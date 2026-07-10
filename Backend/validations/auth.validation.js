const authValidation = {
  register: (req, res, next) => {
    const { username, password } = req.body;
    const errors = [];

    // Checking username
    if (!username || typeof username !== "string") {
      errors.push("Username is required");
    } else {
      const trimmed = username.trim();
      if (trimmed.length < 3 || trimmed.length > 15) {
        errors.push("Username must be between 3 and 15 characters");
      }
      if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
        errors.push(
          "Username can only contain letters, numbers, and underscores",
        );
      }
    }

    // Checking password
    if (!password || typeof password !== "string") {
      errors.push("Password is required");
    } else {
      if (password.length < 8) {
        errors.push("Password must be at least 8 characters");
      }
      if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
      }
      if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number");
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }
    // Normalize before passing along
    req.body.username = username.trim()
    next();
  }
};
module.exports = authValidation