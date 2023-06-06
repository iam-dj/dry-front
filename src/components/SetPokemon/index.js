import React, { useState } from "react";
import "./style.css";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import API from "../../utils/API";
import { useNavigate } from "react-router-dom";


export default function SetPokemon(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();

  const handleSelectButtonClick = async (trainerId, pokemonName) => {
    // console.log('trainerId',trainerId);
    // console.log('pokemonName',pokemonName);
    try {
      await API.updateMainPokemon(trainerId, pokemonName);
      
      
      navigate("/dashboard");
      // console.log('data',data)
      // setPokemonPic(mainPokemon.img_url);
      // console.log("all",allPokemon);

    } catch (error) {
      console.log(error);
    }
  };


  const [pokemonPic, setPokemonPic] = useState("");

  const allPokemon = props.myTrainerData.pokemons;
  const mainPokemon = allPokemon.filter((p) => p.isMain);
  // console.log(mainPokemon)
  const caughtPokemon = allPokemon.filter((p) => p.isCaught);

  const handleDropdownSelect = (eventKey) => {
    const selected = caughtPokemon.find((p) => p.name === eventKey);
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
            <div 
            
            className="prof-card pokemon-card "
            style={{ background: "#f0f1c8"  }}

            >
              <div className=" card-content">
                <div className="image-container pokemon-card">
                  <Card.Img
                    variant="top"
                    //f0f1c8
                    // src={pokemonPic}
                    src={p.img_url}
                    alt={p.name}
                    className="pokemon-image "
                    style={{ background: "#f0f1c8"  }}
                    
                  />
                  <DropdownButton
                    title="See Move List"
                    variant="primary"
                    size="sm"

                  >
                    <Dropdown.Item eventKey="move1">{p.move1.name} - {p.move1.power} - {p.move1.type}</Dropdown.Item>
                    <Dropdown.Item eventKey="move2">{p.move2.name} - {p.move2.power} - {p.move2.type}</Dropdown.Item>
                    <Dropdown.Item eventKey="move3">{p.move3.name} - {p.move3.power} - {p.move3.type}</Dropdown.Item>
                    <Dropdown.Item eventKey="move4">{p.move4.name} - {p.move4.power} - {p.move4.type}</Dropdown.Item>
                  </DropdownButton>
                </div>
                <Card.Body                     style={{ background: "#f0f1c8"  }}
 >
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>Type: {p.type}</Card.Text>
                  <Card.Text>HP: {p.hp}</Card.Text>
                </Card.Body>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <Button
            onClick={handleButtonClick}
            className="btn-primary choose-button d-flex justify-content-center align-items-center"
            style={{
              marginRight: 10 + "px",
              marginBottom: 10 + "px",
              marginLeft: 10 + "px",
              paddingBottom: 0 + "px",
              // background: "#f0f1c8",

            }}
          >
            I Choose You
          </Button>
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
              onClick={() => {
                handleSelectButtonClick(props.trainerId, selectedPokemon.name);
              }}
            >
              Select
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Row className="justify-content-center">
        {caughtPokemon.map((p) => (
          <Col key={p.id} className="justify-content-center ">
            <div
              style={{
                fontSize: "x-small",
                marginRight: 10 + "px",
                marginBottom: 10 + "px",
                marginLeft: 10 + "px",
                paddingBottom: 0 + "px",
                background: "#f0f1c8",

              }}
              className="pokemon-card "
            >
              <div className=" ">
                <div className="pokemon-cad">
                  <Card.Img
                    style={{
                      border: "none",
                      background: "#f0f1c8",
                    }}
                    variant="top"
                    src={p.img_url}
                    alt={p.name}
                    className="pokemon-image"
                  />
                </div>
                <DropdownButton
                    title="See Move List"
                    variant="primary"
                    size="sm"

                  >
                    <Dropdown.Item eventKey="move1">{p.move1.name} - {p.move1.power} - {p.move1.type}</Dropdown.Item>
                    <Dropdown.Item eventKey="move2">{p.move2.name} - {p.move2.power} - {p.move2.type}</Dropdown.Item>
                    <Dropdown.Item eventKey="move3">{p.move3.name} - {p.move3.power} - {p.move3.type}</Dropdown.Item>
                    <Dropdown.Item eventKey="move4">{p.move4.name} - {p.move4.power} - {p.move4.type}</Dropdown.Item>
                  </DropdownButton>
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "x-small",
                      marginRight: 10 + "px",
                      marginLeft: 10 + "px",
                      paddingBottom: 0 + "px",
                    }}
                  >
                    Type: {p.type}
                    <Card.Text>HP: {p.hp}</Card.Text>

                  </Card.Text>
                </Card.Body>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
