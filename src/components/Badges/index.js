import React from "react";
import "./style.css";
import one from "./assets/one.png";
import two from "./assets/two.png";
import three from "./assets/three.png";
import four from "./assets/four.png";
import five from "./assets/five.png";
import six from "./assets/six.png";
import seven from "./assets/seven.png";
import eight from "./assets/eight.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ash from "./ash.json";

export default function Badges() {
  const badges = [
    { name: "boulder", image: one, badge: ash[0].boulder_badge },
    { name: "cascade", image: two, badge: ash[0].cascade_badge },
    { name: "thunder", image: three, badge: ash[0].thunder_badge },
    { name: "rainbow", image: four, badge: ash[0].rainbow_badge },
    { name: "soul", image: five, badge: ash[0].soul_badge },
    { name: "marsh", image: six, badge: ash[0].marsh_badge },
    { name: "volcano", image: seven, badge: ash[0].volcano_badge },
    { name: "earth", image: eight, badge: ash[0].earth_badge },
  ];

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          {badges.map((badge, index) => (
            <Col xs={1} className="p-1" key={index}>
              <img
                className={`imgFix ${!badge.badge && "badge-disabled"}`}
                alt={badge.name}
                src={badge.image}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
