require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const Workout = require("./models/Workout");

const authMiddleware = require("./middleware/authMiddleware");
const workoutRoutes = require("./routes/workoutRoutes");

const authRoutes = require("./routes/authRoutes");


const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
// protected workout routes
app.use("/api/workouts", authMiddleware, workoutRoutes);



// connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// test route
app.get("/", (req, res) => {
  res.json({ message: "Workout Logger API running" });
});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
