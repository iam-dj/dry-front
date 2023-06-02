import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import bfg from "./assets/bg.png";


export default function Catch(props) {
    const navigate = useNavigate();


    useEffect(() => {
        if (props.token === null ) {
          navigate("/login");
        }
      }, [props.token]);

    const cardStyle = {
    backgroundImage: `url(${bfg})`,
    backgroundSize: "auto",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    width: "100%",
    height: "auto",
  };

  return (
    <>
      {props.token ? (
    <div>
        <body style={cardStyle}>



        </body>
    </div>
     ) : (
        <h1>Login to see page!</h1>
      )}
    </>
  );
}
