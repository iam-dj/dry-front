import React, { useState } from "react";
import bfg from "./assets/bg.png";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

export default function Catch(props) {
  const cardStyle = {
    backgroundImage: `url(${bfg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [isFetching, setIsFetching] = useState(false);

  const handleButtonClick = () => {
    setIsFetching(true);
    // Perform any necessary actions here
    setTimeout(() => {
      setIsFetching(false);
    }, 3000); // Simulating a delay before resetting the state
  };

  return (
    <div style={cardStyle}>
      <Button
        className="btn-danger"
        variant="secondary"
        id="dropdown-battle"
        onClick={handleButtonClick}
        disabled={isFetching}
      >
        {isFetching ? (
          <img
            src="https://media3.giphy.com/media/dGD5YHl8xW6c/giphy.gif?cid=ecf05e479h8f5shzhb7oypucnalyj5v7bg5quyve5p2dpznb&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="fetching-pokemon"
          />
        ) : (
          "Catch 'em All"
        )}
      </Button>
    </div>
  );
}
