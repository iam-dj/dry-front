import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import bfg from "./assets/poke_bg.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthForm(props) {
  const navigate = useNavigate();
  const cardStyle = {
    backgroundImage: `url(${bfg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // backgroundAttachment: "fixed",
    height: "100vh",
    width: "100%",
  };

  //checks to see if there is a redirect in the params, and shows toast

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get("redirect");

  useEffect(() => {
    if (!props.trainerId && redirect === "true") {
    }
  }, [props.trainerId, redirect]);

  const formStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "space-around",
    height: "100vh",
    padding: "20px",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // email is an example of signup only field, not in use for this app
  // const [email, setEmail] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
      // email is an example of signup only field, not in use for this app
      //} else if (e.target.name === "firstName") {

      //   setfirstName(e.target.value);
      // } else if (e.target.name === "lastName") {
      //   setlastName(e.target.value);
      // } else if (e.target.name === "email") {
      //   setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.usage === "Login") {
      API.login({
        username: username,
        password: password,
      })
        .then((data) => {
          if (data.user) {
            // console.log(data);
            props.setUserId(data.user.id);
            props.setTrainerId(data.user.Trainer.id);
            props.setUsername(data.user.username);
            props.setToken(data.token);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          } else {
            console.log("ERROR");
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
        });
    } else {
      API.signup({
        username: username,
        password: password,
      })
        .then((data) => {
          // console.log(data);
          if (data.user) {
            props.setUserId(data.user.id);
            props.setUsername(data.user.username);
            props.setToken(data.token);
            localStorage.setItem("token", data.token);
            navigate("/createtrainer");
          } else {
            console.log("ERROR");
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
        });
    }
  };
  return (
    <main className="AuthForm" style={cardStyle}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          style={{ margin: 10 + "px" }}
          name="username"
          onChange={handleChange}
          value={username}
          placeholder="username"
        />
        <input
          name="password"
          onChange={handleChange}
          value={password}
          type="password"
          placeholder="password"
        />
        {/* if i need additional form fields for signup: */}
        {/* // email is an example of signup only field, not in use for this app */}
        {/* {props.usage==="Signup"&& <input name="email" onChange={handleChange} placeholder="email" value={email}/>} */}
        {/* {props.usage==="Signup"?<input placeholder='signup only'/> :null} */}
        <button style={{ margin: 20 + "px" }} className="btn btn-sm btn-danger">
          {props.usage}
        </button>
      </form>
    </main>
  );
}
