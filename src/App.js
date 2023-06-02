import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import AuthForm from "./pages/AuthForm";
import CreateTrainer from "./pages/CreateTrainer";
import Battle from "./pages/Battle";
import Home from "./pages/Home";
// import NewPallet from "./pages/NewPallet";
import API from "./utils/API";
function App() {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      API.verifyToken(storedToken)
        .then((data) => {
          setToken(storedToken);
          setUserId(data.id);
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
    setToken("");
    window.location.assign("/login");
  }

  return (
    <Router>
      <Navbar userId={userId} logout={logout} username={username} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <AuthForm
              usage="Login"
              setUserId={setUserId}
              setUsername={setUsername}
              setToken={setToken}
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
              setToken={setToken}
            />
          }
        />
        {/* <Route path="/users/:username" element={<h2>profile page</h2>} /> */}
        {/* <Route path="/trainers" element={<h2>all trainers page</h2>} /> */}
        {/* <Route path="/newpallet" element={<NewPallet token={token}/>} /> */}
        <Route path="/battle" element={<Battle />} />
        <Route path="/*" element={<h2>page not found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
