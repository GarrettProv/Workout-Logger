const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if user already exists
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      passwordHash,
    });

    res.status(201).json({
      message: "User created",
      userId: user._id,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // find user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // compare password
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
