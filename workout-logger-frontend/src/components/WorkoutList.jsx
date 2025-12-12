function WorkoutList({ workouts, onDelete }) {
  if (workouts.length === 0) {
    return <p>No workouts yet. Log your first one!</p>;
  }

  return (
    <div>
      <h3>Your Workouts</h3>
      {workouts.map((w) => (
        <div
          key={w._id}
          style={{
            border: "1px solid #ccc",
            padding: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <strong>{w.title}</strong>{" "}
          {w.date && (
            <span>– {new Date(w.date).toLocaleDateString()}</span>
          )}
          <ul>
            {w.exercises.map((ex, idx) => (
              <li key={idx}>
                {ex.name}: {ex.sets} × {ex.reps} @ {ex.weight}
              </li>
            ))}
          </ul>
          {w.notes && <p>{w.notes}</p>}
          <button onClick={() => onDelete(w._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default WorkoutList;
