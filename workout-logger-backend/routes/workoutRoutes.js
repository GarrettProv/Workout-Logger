const express = require("express");
const Workout = require("../models/Workout");

const router = express.Router();

// GET /api/workouts - get all workouts for logged-in user
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    console.error("Get workouts error:", err);
    res.status(500).json({ error: "Failed to fetch workouts" });
  }
});

// POST /api/workouts - create new workout
router.post("/", async (req, res) => {
  try {
    const { title, date, exercises, notes } = req.body;

    const workout = await Workout.create({
      userId: req.user.userId,
      title,
      date,
      exercises,
      notes,
    });

    res.status(201).json(workout);
  } catch (err) {
    console.error("Create workout error:", err);
    res.status(500).json({ error: "Failed to create workout" });
  }
});

// PATCH /api/workouts/:id - update existing workout
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await Workout.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.json(workout);
  } catch (err) {
    console.error("Update workout error:", err);
    res.status(500).json({ error: "Failed to update workout" });
  }
});

// DELETE /api/workouts/:id - delete a workout
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Workout.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.json({ message: "Workout deleted" });
  } catch (err) {
    console.error("Delete workout error:", err);
    res.status(500).json({ error: "Failed to delete workout" });
  }
});

module.exports = router;
