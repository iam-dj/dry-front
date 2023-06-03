import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import AuthForm from "./pages/AuthForm";
import CreateTrainer from "./pages/CreateTrainer";
import Battle from "./pages/Battle";
import HomePage from "./pages/HomePage";
import Catch from "./pages/Catch";
import Dashboard from "./pages/Dashboard";
import Gym from "./pages/Gym";
import SetPoke from "./pages/SetPoke";
import API from "./utils/API";
import { Cloudinary } from "@cloudinary/url-gen";

function App() {
  const [userId, setUserId] = useState();
  const [trainerId, setTrainerId] = useState();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      API.verifyToken(storedToken)
        .then((data) => {
          setToken(storedToken);
          setUserId(data.id);
          setTrainerId(data.Trainer.id);
          setUsername(data.username);
        })
        .catch((err) => {
          console.log("oh noes");
          console.log(err);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUserId(null);
    setUsername("");
    setTrainerId(null);
    setToken("");
    window.location.assign("/login");
  };

  return (
    <Router>
      <Navbar userId={userId} logout={logout} username={username} />
      <Routes>
        <Route
          path="/"
          element={
            userId ? (
              <HomePage token={token} userId={userId} trainerId={trainerId} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            <AuthForm
              usage="Login"
              setUserId={setUserId}
              setUsername={setUsername}
              setToken={setToken}
              setTrainerId={setTrainerId}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <AuthForm
              usage="Signup"
              setUserId={setUserId}
              setUsername={setUsername}
              setToken={setToken}
            />
          }
        />
        <Route
          path="/createtrainer"
          element={
            <CreateTrainer
              usage="Create"
              userId={userId}
              setTrainerId={setTrainerId}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard token={token} userId={userId} trainerId={trainerId} />
          }
        />
        <Route
          path="/setpoke"
          element={
            <SetPoke
              setUserId={setUserId}
              token={token}
              trainerId={trainerId}
            />
          }
        />
        <Route
          path="/catch"
          element={<Catch setUserId={setUserId} token={token} />}
        />
        <Route
          path="/gym"
          element={<Gym setUserId={setUserId} token={token} />}
        />
        <Route path="/battle" element={<Battle token={token} />} />
        <Route path="/*" element={<h2>page not found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
