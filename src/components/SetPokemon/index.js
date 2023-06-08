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
  const [selectedPicture, setSelectedPicture] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedHp, setSelectedHp] = useState("");

  //move1
  const [move1Name, setMove1Name] = useState("");
  const [move1Power, setMove1Power] = useState(0);
  const [move1Type, setMove1Type] = useState("");

  //move2
  const [move2Name, setMove2Name] = useState("");
  const [move2Power, setMove2Power] = useState(0);
  const [move2Type, setMove2Type] = useState("");

  //move3
  const [move3Name, setMove3Name] = useState("");
  const [move3Power, setMove3Power] = useState(0);
  const [move3Type, setMove3Type] = useState("");

  //move4
  const [move4Name, setMove4Name] = useState("");
  const [move4Power, setMove4Power] = useState(0);
  const [move4Type, setMove4Type] = useState("");

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
      const myPoke = await API.getBattlePoke(trainerId);

      // navigate("/dashboard");
      console.log(myPoke[0].img_url);
      setSelectedPicture(myPoke[0].img_url);
      setSelectedName(myPoke[0].name);
      setSelectedType(myPoke[0].type);
      setSelectedLevel(myPoke[0].level);
      setSelectedHp(myPoke[0].hp);
      setSelectedPicture(myPoke[0].img_url);

      //move1
      setMove1Name(myPoke[0].move1.name);
      setMove1Power(myPoke[0].move1.power);
      setMove1Type(myPoke[0].move1.type);

      setMove2Name(myPoke[0].move2.name);
      setMove2Power(myPoke[0].move2.power);
      setMove2Type(myPoke[0].move2.type);

      setMove3Name(myPoke[0].move3.name);
      setMove3Power(myPoke[0].move3.power);
      setMove3Type(myPoke[0].move3.type);

      setMove4Name(myPoke[0].move4.name);
      setMove4Power(myPoke[0].move4.power);
      setMove4Type(myPoke[0].move4.type);

      console.log("myPoke", myPoke);
    } catch (error) {
      console.log(error);
    }
  };

  // const [pokemonPic, setPokemonPic] = useState("");

  const allPokemon = props.myTrainerData.pokemons;
  const mainPokemon = allPokemon.filter((p) => p.isMain);
  console.log(selectedPicture);
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
              style={{ background: "#f0f1c8" }}
            >
              <div className=" card-content">
                <div className="">
                  <Card.Img
                    variant="top"
                    //f0f1c8
                    // src={pokemonPic}
                    src={selectedPicture || p.img_url}
                    alt={selectedName || p.name}
                    className="pokemon-image"
                    style={{ background: "#f0f1c8", fontSize: "medium" }}
                  />
                  <DropdownButton
                    title="See Move List"
                    variant="primary"
                    size="sm"
                  >
                    <Dropdown.Item eventKey="move1">
                      {move1Name || p.move1.name} - {move1Power||p.move1.power} - {move1Type||p.move1.type}
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="move2">
                    {move2Name || p.move2.name} - {move2Power || p.move2.power} - {move2Type || p.move2.type}
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="move3">
                    {move3Name || p.move3.name} - {move3Power || p.move3.power} - {move3Type || p.move3.type}
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="move4">
                    {move4Name || p.move4.name} - {move4Power || p.move4.power} - {move4Type || p.move4.type}
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                <Card.Body
                // style={{ background: "#f0f1c8"  }}
                >
                  <Card.Title
                    style={{ border: "none", marginTop: "10px" }}
                    className="font-text"
                  >
                    {selectedName || p.name}
                  </Card.Title>
                  <Card.Text>Level: {selectedLevel || p.level}</Card.Text>
                  <Card.Text>HP: {selectedHp || p.hp}</Card.Text>
                  <Card.Text>Type: {selectedType || p.type}</Card.Text>
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
              // paddingTop: 600 + "px",
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
                      // objectFit: "contain"
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
                  <Dropdown.Item eventKey="move1">
                    {p.move1.name} - {p.move1.power} - {p.move1.type}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="move2">
                    {p.move2.name} - {p.move2.power} - {p.move2.type}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="move3">
                    {p.move3.name} - {p.move3.power} - {p.move3.type}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="move4">
                    {p.move4.name} - {p.move4.power} - {p.move4.type}
                  </Dropdown.Item>
                </DropdownButton>
                <Card.Body>
                  <Card.Title
                    className="font-text"
                    style={{ border: "none", marginTop: "10px" }}
                  >
                    {p.name}
                  </Card.Title>
                  <Card.Text>Level: {p.level}</Card.Text>
                  <Card.Text
                    style={{
                      fontSize: "x-small",
                      marginRight: 10 + "px",
                      marginLeft: 10 + "px",
                      paddingBottom: 0 + "px",
                    }}
                  >
                    <Card.Text>HP: {p.hp}</Card.Text>
                    Type: {p.type}
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
