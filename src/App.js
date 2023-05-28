import { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthForm from "./pages/AuthForm";
import Home from "./pages/Home";
import NewPallet from "./pages/NewPallet";
import API from "./utils/API"
function App() {
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("")
  const [token, setToken] = useState("")

  useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    API.verifyToken(storedToken).then(data=>{
      setToken(storedToken);
      setUserId(data.id);
      setUsername(data.username);
    }).catch(err=>{
      console.log("oh noes")
      console.log(err)
      localStorage.removeItem("token")
    })
  },[])

  return (
    <Router>
    <Navbar userId={userId} username={username}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<AuthForm usage="Login" setUserId={setUserId} setUsername={setUsername} setToken={setToken}/>} />
        <Route path="/signup" element={<AuthForm usage="Signup" setUserId={setUserId} setUsername={setUsername} setToken={setToken}/>} />
        <Route path="/user/:username" element={<h2>profile page</h2>} />
        <Route path="/pallet/:id" element={<h2>all trainers page</h2>} />
        <Route path="/newpallet" element={<NewPallet token={token}/>} />
        <Route path="/*" element={<h2>page not found</h2>} />

      </Routes>
      <hr />
      <h2>Footer</h2>
    </Router>
  );
}

export default App;
