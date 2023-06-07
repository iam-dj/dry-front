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
import Train from "./pages/Train";
import HomePage from "./pages/HomePage";
import Catch from "./pages/Catch";
import BoulderBadge from "./pages/BoulderBadge";
import CascadeBadge from "./pages/CascadeBadge";
import ThunderBadge from "./pages/ThunderBadge";
import RainbowBadge from "./pages/RainbowBadge";
import SoulBadge from "./pages/SoulBadge";
import MarshBadge from "./pages/MarshBadge";
import VolcanoBadge from "./pages/VolcanoBadge";
import EarthBadge from "./pages/EarthBadge";
import Dashboard from "./pages/Dashboard";
import Gym from "./pages/Gym";
import SetPoke from "./pages/SetPoke";
import API from "./utils/API";
// import { Cloudinary } from "@cloudinary/url-gen";

function App() {
  const [userId, setUserId] = useState();
  const [trainerId, setTrainerId] = useState();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const cardStyle = {
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
  };

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
              <HomePage
                style={cardStyle}
                token={token}
                userId={userId}
                trainerId={trainerId}
              />
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
            <Dashboard
              style={cardStyle}
              token={token}
              userId={userId}
              trainerId={trainerId}
            />
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
          element={
            <Catch setUserId={setUserId} trainerId={trainerId} token={token} />
          }
        />
        <Route
          path="/gym"
          element={<Gym setUserId={setUserId} token={token} />}
        />
        <Route
          path="/boulder-badge"
          element={
            <BoulderBadge
              setUserId={setUserId}
              setUsername={setUsername}
              setToken={setToken}
              setTrainerId={setTrainerId}
              trainerId={trainerId}
            />
          }
        />
        <Route
          path="/cascade-badge"
          element={
            <CascadeBadge
              setUserId={setUserId}
              setUsername={setUsername}
              setToken={setToken}
              setTrainerId={setTrainerId}
              trainerId={trainerId}
            />
          }
        />
        <Route
          path="/thunder-badge"
          element={
            <ThunderBadge
              setUserId={setUserId}
              setUsername={setUsername}
              setToken={setToken}
              setTrainerId={setTrainerId}
              trainerId={trainerId}
            />
          }
        />
        <Route
          path="/rainbow-badge"
          element={
            <RainbowBadge
              setUserId={setUserId}
              setUsername={setUsername}
              setToken={setToken}
              setTrainerId={setTrainerId}
              trainerId={trainerId}
            />
          }
        />
        <Route
          path="/soul-badge"
          element={
            <SoulBadge
              setUserId={setUserId}
              setUsername={setUsername}
              setToken={setToken}
              setTrainerId={setTrainerId}
              trainerId={trainerId}
            />
          }
        />
        <Route
          path="/marsh-badge"
          element={
            <MarshBadge
              setUserId={setUserId}
              setUsername={setUsername}
              setToken={setToken}
              setTrainerId={setTrainerId}
              trainerId={trainerId}
            />
          }
        />
        <Route
          path="/volcano-badge"
          element={
            <VolcanoBadge
              setUserId={setUserId}
              setUsername={setUsername}
              setToken={setToken}
              setTrainerId={setTrainerId}
              trainerId={trainerId}
            />
          }
        />
        <Route
          path="/earth-badge"
          element={
            <EarthBadge
              setUserId={setUserId}
              setUsername={setUsername}
              setToken={setToken}
              setTrainerId={setTrainerId}
              trainerId={trainerId}
            />
          }
        />
        <Route
          path="/train"
          element={<Train token={token} trainerId={trainerId} />}
        />
        <Route path="/*" element={<h2>page not found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
