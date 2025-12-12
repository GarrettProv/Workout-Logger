import { useEffect, useState } from "react";
import { api, setAuthToken } from "./api";
import AuthPage from "./components/AuthPage";
import WorkoutPage from "./components/WorkoutPage";

function App() {
  const [user, setUser] = useState(null);

  // on first load, check localStorage for saved login
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLoginSuccess(data) {
    // data = { token, user: { id, username, email } }
    setUser(data.user);
    setAuthToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  function handleLogout() {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  if (!user) {
    // show login/register screen
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  // once logged in, show workout UI
  return <WorkoutPage user={user} onLogout={handleLogout} />;
}

export default App;
