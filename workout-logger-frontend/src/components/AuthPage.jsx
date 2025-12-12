import { useState } from "react";
import { api } from "../api";

function AuthPage({ onLoginSuccess }) {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    emailOrUsername: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      // after a successful signup, switch to login
      setMode("login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        emailOrUsername: form.emailOrUsername,
        password: form.password,
      });
      onLoginSuccess(res.data); // pass token + user to App
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Workout Logger</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setMode("login")} disabled={mode === "login"}>
          Login
        </button>
        <button
          onClick={() => setMode("register")}
          disabled={mode === "register"}
          style={{ marginLeft: "0.5rem" }}
        >
          Register
        </button>
      </div>

      {mode === "register" ? (
        <form onSubmit={handleRegister}>
          <div>
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" style={{ marginTop: "0.5rem" }}>
            Sign Up
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <input
              name="emailOrUsername"
              placeholder="Email or Username"
              value={form.emailOrUsername}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" style={{ marginTop: "0.5rem" }}>
            Log In
          </button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default AuthPage;
