import React from "react";
import Nav from 'react-bootstrap/Nav';
import "./style.css";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function PokeDex() {
  const pokemonTypes = [
    "Fire",
    "Flying",
    "Dragon",
    "Water",
    "Grass",
    "Electric",
    "Rock",
    "Ground",
    "Ice",
    "Psychic",
    "Bug",
    "Poison",
    "Normal",
    "Fighting",
  ];
  return (
    <div>
      <Container className="space-tab">
        <Nav variant="tabs" defaultActiveKey="/home">
          {pokemonTypes.map((type, index) => (
            <Nav.Item key={index}>
              <Nav.Link eventKey={`link-${index}`} className="tab-link">
                {type}
              </Nav.Link>
            </Nav.Item>
          ))}
          <div></div>
        </Nav>
      </Container>
    </div>
  );
}
