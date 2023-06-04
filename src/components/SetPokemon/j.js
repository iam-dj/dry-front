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
import API from "../../utils/API";

try {
    const myTrainerData = await API.getOneTrainer(props.trainerId);
    console.log('myTrainerData',myTrainerData);
    // navigate("/dashboard");

  } catch (error) {
    console.log(error);
  }

const RunPutFunction = async (trainerId, pokemonName) => {
  try {
    await API.updateMainPokemon(trainerId, pokemonName);
    console.log('pokemonName',pokemonName);

   
    
    // Handle success or perform additional operations
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

export default function Home(props) {
  const [showModal, setShowModal] = useState(false);
  const [mainPoke, setMainPoke] = useState([]); // Define the mainPokemon state
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  let selected = null;
  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const allPokemon = props.myTrainerData.pokemons;
  const mainPokemon = allPokemon.filter((p) => p.isMain);
  const caughtPokemon = allPokemon.filter((p) => p.isCaught);

  const handleDropdownSelect = (eventKey) => {
    const selected = caughtPokemon.find((p) => p.name === eventKey);
    setSelectedPokemon(selected);
  };
  
  const updatedMainPokemon = mainPoke.map((p) =>
  p.name === pokemonName ? { ...p, isMain: true } : { ...p, isMain: false }
);
setMainPoke(updatedMainPokemon);

  // const updatePokemonOnScreen = (id, updatedPokemon) => {
  //   const updatedMainPokemon = mainPoke.map((p) =>
  //     p.id === id ? updatedPokemon : p
  //   );
  //   setMainPoke(updatedMainPokemon);
  // };

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
                  <Dropdown.Item key={p.id} eventKey={p.name}>
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
              onClick={() => {RunPutFunction(props.trainerId, selectedPokemon.name);
              }}
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
                <div className="image-container">
                 
                    <Card.Img
                      variant="top"
                      src={p.img_url}
                      alt={p.name}
                      className="pokemon-image"
                    />
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