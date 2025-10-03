// backend/controllers/authController.js
const User = require("../models/User"); // make sure path is correct

// ✅ Login function
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2️⃣ Check if password matches
    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // 3️⃣ Login successful
    res.json({
      message: "Login successful",
      user: { _id: user._id, email: user.email } // send minimal user info
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Register function
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2️⃣ Create new user
    const newUser = new User({ email, password });
    await newUser.save();

    // 3️⃣ Registration successful
    res.json({
      message: "Registration successful",
      user: { _id: newUser._id, email: newUser.email },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
