import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";
import bfg from "./assets/poke_bg.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { image } from "@cloudinary/url-gen/qualifiers/source";

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
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [WidgetButtonDisabled, setWidgetButtonDisabled] = useState(false);
  var imageUrl = "";

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "name") {
      const lettersAndSpaceOnly = /^[A-Za-z ]*$/;
      const inputValue = e.target.value;
      if (lettersAndSpaceOnly.test(inputValue)) {
        setName(inputValue);
      }
    } else if (e.target.name === "age") {
      const numbersOnly = /^[0-9]*$/;
      const inputValue = e.target.value;
      if (numbersOnly.test(inputValue)) {
        setAge(inputValue);
      }
    } else if (e.target.name === "passwordCheck") {
      setPasswordCheck(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  // const handleSubmit2 = (e) => {

  // };

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
      //props.usage === "Signup"
      if (
        username &&
        password &&
        name &&
        age &&
        password === passwordCheck
      ) {
        setButtonDisabled(true);
        API.signup({
          username: username,
          password: password,
        })
          .then((data) => {
            if (data.user) {
              props.setUserId(data.user.id);
              props.setUsername(data.user.username);
              props.setToken(data.token);
              localStorage.setItem("token", data.token);

              if (name && age) {
                setButtonDisabled(true);
                API.createTrainer({
                  name: name,
                  age: age,
                  profilePicUrl: imageUrl,
                  user_id: data.user.id,
                })
                  .then((data) => {
                    console.log(data.id);
                    console.log(data.name, "name");
                    console.log(data.age, "age");
                    console.log(data.profilePicUrl, "pic");
                    if (data.name && data.age && data.profilePicUrl) {
                      props.setTrainerId(data.id);
                      navigate("/");
                    } else {
                      console.log("ERROR CREATING TRAINER");
                      window.location.assign("/signup");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            } else {
              console.log("ERROR Image Upload or name or age missing");
            }
          })
          .catch((err) => {
            console.log(err);
            localStorage.removeItem("token");
          });
      } else {
        toast.error("Form incorrectly filled out");
        setInterval(() => {
          window.location.assign("/signup");
        }, 2000);
        return;
      }
    }
  };
  function handleOpenWidget() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "duaznt4wg",
        uploadPreset: "drty_nomads_upload",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("result.info.url", result.info.url);
          // setImageUrl(result.url);
          imageUrl = result.info.url;
          // setWidgetButtonDisabled(true);
        } 
        
      }
    );
    myWidget.open();
  }
  return (
    <>
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

          {props.usage === "Signup" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>
                <input
                  style={{ margin: 10 + "px" }}
                  name="passwordCheck"
                  onChange={handleChange}
                  value={passwordCheck}
                  type="password"
                  placeholder="Re-enter password"
                />
              </div>
              <div>
                <input
                  // style={{ margin: 10 + "px" }}
                  name="name"
                  onChange={handleChange}
                  value={name}
                  placeholder="name"
                />
              </div>
              <div>
                <input
                  style={{ margin: 10 + "px" }}
                  name="age"
                  onChange={handleChange}
                  value={age}
                  type="age"
                  placeholder="age"
                />
              </div>
              <div>
                <button
                  style={{ margin: 10 + "px" }}
                  id="upload_widget"
                  className="cloudinary-button btn btn-sm btn-danger"
                  onClick={handleOpenWidget}
                  disabled={WidgetButtonDisabled}
                  type="button"
                >
                  Upload Profile Picture
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={buttonDisabled}
            // onClick={handleSubmit2}
            style={{ margin: 20 + "px" }}
            className="btn btn-sm btn-danger"
          >
            {props.usage}
          </button>
        </form>
      </main>
    </>
  );
}
