const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: String,
  sets: Number,
  reps: Number,
  weight: Number,
});

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
  exercises: [exerciseSchema],
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

// This will create a "workouts" collection
module.exports = mongoose.model("Workout", workoutSchema);
