import React, { useState } from "react";
import API from "../../utils/API";
import bfg from "./assets/poke_bg.png";
import { useNavigate } from "react-router-dom";

export default function CreateTrainer(props) {
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

  const formStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "space-around",
    height: "100vh",
    padding: "20px",
  };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  //   let profilePicUploadUrl = "";

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else {
      setAge(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    API.createTrainer({
      name: name,
      age: age,
      user_id: props.userId,
    })
      .then((data) => {
        console.log(data.id);
        if (data.name && data.age) {
          props.setTrainerId(data.id);
          navigate("/");
        } else {
          console.log("ERROR");
        }
      })
      .catch((err) => {
        console.log(err);
        //   localStorage.removeItem("token");
      });
  };
  return (
    <div>
      <main className="AuthForm" style={cardStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <input
            style={{ margin: 10 + "px" }}
            name="name"
            onChange={handleChange}
            value={name}
            placeholder="name"
          />
          <input
            name="age"
            onChange={handleChange}
            value={age}
            type="age"
            placeholder="age"
          />
          {/* if i need additional form fields for signup: */}
          {/* // email is an example of signup only field, not in use for this app */}
          {/* {props.usage==="Signup"&& <input name="email" onChange={handleChange} placeholder="email" value={email}/>} */}
          {/* {props.usage==="Signup"?<input placeholder='signup only'/> :null} */}
          <button
            style={{ margin: 10 + "px" }}
            className="btn btn-sm btn-danger"
          >
            {props.usage}
          </button>
        </form>
      </main>
    </div>
  );
}
