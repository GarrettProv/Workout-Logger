import { useState } from "react";

function WorkoutForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const workout = {
      title,
      date: new Date(),
      exercises: [
        {
          name: exerciseName,
          sets: Number(sets),
          reps: Number(reps),
          weight: Number(weight),
        },
      ],
      notes,
    };

    onCreate(workout);

    setTitle("");
    setExerciseName("");
    setSets("");
    setReps("");
    setWeight("");
    setNotes("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h3>Log a Workout</h3>
      <div>
        <input
          placeholder="Workout title (e.g. Push Day)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Exercise name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <button type="submit" style={{ marginTop: "0.5rem" }}>
        Save Workout
      </button>
    </form>
  );
}

export default WorkoutForm;
