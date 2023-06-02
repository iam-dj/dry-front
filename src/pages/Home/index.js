import React from "react";
import "./style.css";
import bfg from "./assets/bg.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokeDex from "../../components/PokeDex";
import Badges from "../../components/Badges";
import Button from "../../components/Buttons";

import ash from "./ash.json";

export default function Home() {
  const {
    name,
    age,
    profilePicUrl,
    numWins,
    numLosses,
    boulder_badge,
    cascade_badge,
    thunder_badge,
    rainbow_badge,
    soul_badge,
    marsh_badge,
    volcano_badge,
    earth_badge,
  } = ash[0];

  const cardStyle = {
    backgroundImage: `url(${bfg})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    width: "100%",
  };

  return (
    <div>
      <body style={cardStyle}>

        <Container className="card">
          <Row>
            <Col xs={4} md={3}>
              <img
                className="profile img-fluid"
                alt="profile"
                src={profilePicUrl}
              />
            </Col>
            <Col className="profile2">
              <h1 className="profile-name">{name}</h1>
              <h2 className="profile-age">Age: {age}</h2>
              <h6 className="profile-record">
                Record: {numWins} 🥇 ➖ {numLosses} 🚫
              </h6>
              <Badges
                badges={[
                  boulder_badge,
                  cascade_badge,
                  thunder_badge,
                  rainbow_badge,
                  soul_badge,
                  marsh_badge,
                  volcano_badge,
                  earth_badge,
                ]}
              />
            </Col>

            <Col xs={4} md={3} className="d-flex justify-content-center align-items-center">
      <Button>Button</Button>
    </Col>
          </Row>
        </Container>

        <br />

        <PokeDex />
      </body>
    </div>
  );
}
