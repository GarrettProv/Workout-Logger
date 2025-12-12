import { useEffect, useState } from "react";
import { api } from "../api";
import WorkoutForm from "./WorkoutForm";
import WorkoutList from "./WorkoutList";

function WorkoutPage({ user, onLogout }) {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");

  async function fetchWorkouts() {
    try {
      const res = await api.get("/workouts");
      setWorkouts(res.data);
    } catch (err) {
      setError("Failed to load workouts");
    }
  }

  useEffect(() => {
    fetchWorkouts();
  }, []);

  async function handleCreateWorkout(workoutData) {
    try {
      const res = await api.post("/workouts", workoutData);
      setWorkouts((prev) => [res.data, ...prev]);
    } catch (err) {
      setError("Failed to create workout");
    }
  }

  async function handleDeleteWorkout(id) {
    try {
      await api.delete(`/workouts/${id}`);
      setWorkouts((prev) => prev.filter((w) => w._id !== id));
    } catch (err) {
      setError("Failed to delete workout");
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Hello, {user.username}</h2>
        <button onClick={onLogout}>Log out</button>
      </div>

      <WorkoutForm onCreate={handleCreateWorkout} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <WorkoutList workouts={workouts} onDelete={handleDeleteWorkout} />
    </div>
  );
}

export default WorkoutPage;
