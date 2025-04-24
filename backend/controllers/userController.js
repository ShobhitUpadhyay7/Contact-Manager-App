import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  // More robust validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    // Check if user exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error("Registration Error:", error);

    // Handle specific error types
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    if (error.code === 11000) {
      // MongoDB duplicate key
      return res.status(400).json({ message: "Email already exists" });
    }

    return res
      .status(500)
      .json({ message: "Server error during registration" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    // Find user
    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" }); // Generic message for security
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify token secret exists
    if (!process.env.ACCESS_TOKEN_SECRET) {
      console.error("ACCESS_TOKEN_SECRET is not defined");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Generate token
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    // Successful login
    return res.status(200).json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export default {
  registerUser,
  loginUser,
  currentUser,
};
