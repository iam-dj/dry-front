import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import bfg from "./assets/bg.png";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function AllTrainers(props) {
  // const allTrainers = props.loadedTrainer;

  const handleBattle = (trainerId) => {
    // Handle battle logic here
    console.log("Battle with trainer:", trainerId);
  };

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
    <div>
      
    </div>
  );
}
