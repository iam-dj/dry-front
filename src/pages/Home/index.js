import React from "react";
import "./style.css";
import bfg from "./assets/bg.png";
import me from "./assets/IMG_3270.png";
import logo from "./assets/pokelogo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokeDex from "../../components/PokeDex";
import Badges from "../../components/Badges";

export default function Home() {
  const cardStyle = {
    backgroundImage: `url(${bfg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

  return (
    <div>
      <body style={cardStyle}>

        <Container className="card">
          <Row>
            <Col xs={4} md={3}>
              <img className="profile img-fluid" alt="profile" src={me} />
            </Col>
            <Col className="profile2">
              <h1>trainer.Name</h1>
              <h2>from</h2>
              <h3>favorite pokemon</h3>
              <h6>record: numwins Wins & numloses Loses </h6>
            </Col>
            <Col xs={4} md={3}>
              <img className="profile img-fluid" alt="profile" src={logo} />
            </Col>
          </Row>
        </Container>

        <br />

        <Badges />

        <PokeDex />

      </body>
    </div>
  );
}
