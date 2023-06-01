import React from "react";
import "./style.css";
import battlebg from "./assets/battle.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
  const cardStyle = {
    backgroundImage: `url(${battlebg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

  return (
    <div>
      <body style={cardStyle}>
        

      </body>
    </div>
  );
}
