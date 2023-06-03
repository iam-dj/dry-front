import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import AuthForm from "./pages/AuthForm";
import CreateTrainer from "./pages/CreateTrainer";
import Battle from "./pages/Battle";
import Home from "./pages/Home";
import Catch from "./pages/Catch";
import Gym from "./pages/Gym";
import SetPoke from "./pages/SetPoke";
import API from "./utils/API";
import { Cloudinary } from "@cloudinary/url-gen";

function App() {
  const [userId, setUserId] = useState();
  const [trainerId, setTrainerId] = useState();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const cld = new Cloudinary({
    cloud: {
      cloudName: "duaznt4wg",
    },
  });

  console.log(trainerId);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      API.verifyToken(storedToken)
        .then((data) => {
          console.log(data);
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

  function logout() {
    localStorage.removeItem("token");
    setUserId(null);
    setUsername("");
    setTrainerId(null);
    setToken("");
    window.location.assign("/login");
  }

  return (
    <Router>
      <Navbar userId={userId} logout={logout} username={username} />
      <Routes>
        <Route
          path="/"
          element={<Home token={token} userId={userId} trainerId={trainerId} />}
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
          path="/setpoke"
          element={
            <SetPoke
              setUserId={setUserId}
              // usage="Create"
              token={token}
            />
          }
        />
        <Route
          path="/catch"
          element={
            <Catch
              setUserId={setUserId}
              // usage="Create"
              token={token}
            />
          }
        />
        <Route
          path="/gym"
          element={
            <Gym
              setUserId={setUserId}
              // usage="Create"
              token={token}
            />
          }
        />

        <Route path="/battle" element={<Battle token={token} />} />
        <Route path="/*" element={<h2>page not found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
