import React, { useState } from "react";
import "./style.css";
// import PokeDex from "../../components/PokeDex";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
// import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";


const RunPutFunction = async () => {
  try {
    // Fetch NPC data from the database
    // Call API.SetFighter route to update isMain to true and set old isMain to false.
  } catch (error) {
    console.error("Error starting battle:", error);
  }
};

export default function Home(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const allPokemon = props.pokemon.pokemons;
  const mainPokemon = allPokemon.filter((p) => p.isMain);
  const caughtPokemon = allPokemon.filter((p) => p.isCaught);

  const handleDropdownSelect = (eventKey, event) => {
    const selected = caughtPokemon.find((p) => p.id === eventKey);
    setSelectedPokemon(selected);
  };

  return (
    <div className="center-content">
      <Row className="justify-content-center">
        {mainPokemon.map((p) => (
          <Col
            key={p.id}
            className="d-flex justify-content-center align-items-center"
          >
            <Card className="pokemon-card">
              <div className="card-content">
                <p>Click card to choose your battlemon</p>
                <div className="image-container">
                  <a href="#" onClick={RunPutFunction}>
                    <Card.Img
                      variant="top"
                      src={p.img_url}
                      alt={p.name}
                      className="pokemon-image"
                    />
                  </a>
                </div>
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>Type: {p.type}</Card.Text>
                </Card.Body>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <button
            onClick={handleButtonClick}
            className="choose-button d-flex justify-content-center align-items-center"
          >
            I Choose You
          </button>
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Choose a Pokémon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Dropdown onSelect={handleDropdownSelect}>
              <Dropdown.Toggle variant="secondary" id="dropdown-pokemon">
                {selectedPokemon ? selectedPokemon.name : "Select a Pokémon"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {caughtPokemon.map((p) => (
                  <Dropdown.Item key={p.id} eventKey={p.id}>
                    {p.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handlePokemonSelect(selectedPokemon)}
            >
              Select
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Row className="justify-content-center">
        {caughtPokemon.map((p) => (
          <Col
            key={p.id}
            className="d-flex justify-content-center align-items-center"
          >
            <Card className="pokemon-card">
              <div className="card-content">
                <p>Click card to choose your battlemon</p>
                <div className="image-container">
                  <a href="#" onClick={RunPutFunction}>
                    <Card.Img
                      variant="top"
                      src={p.img_url}
                      alt={p.name}
                      className="pokemon-image"
                    />
                  </a>
                </div>
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>Type: {p.type}</Card.Text>
                </Card.Body>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
