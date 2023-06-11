import React, { useEffect, useState } from "react";
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
import battlebg from "./assets/setbg.jpg";
import Toast from "react-bootstrap/Toast";

export default function SetPokemon(props) {
  const cardStyle = {
    backgroundImage: `url(${battlebg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    // maxHeight: "100vh",
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedTm, setSelectedTm] = useState(null);
  const [selectedPicture, setSelectedPicture] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedHp, setSelectedHp] = useState("");
  const [selectedMoveId, setSelectedMoveId] = useState();
  const [selectedMoveId2, setSelectedMoveId2] = useState();
  const [selectedMoveId3, setSelectedMoveId3] = useState();
  const [selectedMoveId4, setSelectedMoveId4] = useState();

  //move1
  const [move1Desc, setMove1desc] = useState("");
  const [move1Name, setMove1Name] = useState("");
  const [move1Power, setMove1Power] = useState(0);
  const [move1Type, setMove1Type] = useState("");

  //move2
  const [move2Desc, setMove2desc] = useState("");
  const [move2Name, setMove2Name] = useState("");
  const [move2Power, setMove2Power] = useState(0);
  const [move2Type, setMove2Type] = useState("");

  //move3
  const [move3Desc, setMove3desc] = useState("");
  const [move3Name, setMove3Name] = useState("");
  const [move3Power, setMove3Power] = useState(0);
  const [move3Type, setMove3Type] = useState("");

  //move4
  const [move4Desc, setMove4desc] = useState("");
  const [move4Name, setMove4Name] = useState("");
  const [move4Power, setMove4Power] = useState(0);
  const [move4Type, setMove4Type] = useState("");

  //tms
  const [tms, setTm] = useState("");

  const handleButtonClick = (event) => {
    setShowModal(true);
    const moveId = event.target.id;
    setSelectedMoveId(moveId);
  };
  const handleButtonClick2 = (event) => {
    setShowModal(true);
    const moveId = event.target.id;
    setSelectedMoveId(moveId);
  };
  const handleButtonClick3 = (event) => {
    setShowModal(true);
    const moveId = event.target.id;
    setSelectedMoveId(moveId);
  };
  const handleButtonClick4 = (event) => {
    setShowModal(true);
    const moveId = event.target.id;
    setSelectedMoveId(moveId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [showToast, setShowToast] = useState(false);
  const handleToastClick = () => {
    setShowToast(true);
  };

  // const navigate = useNavigate();

  const handleSelectButtonClick = async (
    trainerId,
    pokemonName,
    moveNum,
    newMove
  ) => {
    console.log("trainerId", trainerId);
    console.log("pokemonName", pokemonName);
    console.log("moveNum", moveNum);
    console.log("newMove", newMove);
    try {
      if (moveNum == "move1") {
        await API.changeMoveOne(trainerId, pokemonName, newMove);
      } else if (moveNum === "move2") {
        await API.changeMoveTwo(trainerId, pokemonName, newMove);
      } else if (moveNum === "move3") {
        await API.changeMoveThree(trainerId, pokemonName, newMove);
      } else {
        await API.changeMoveFour(trainerId, pokemonName, newMove);
      }

      const myPoke = await API.getBattlePoke(trainerId);
      // const myTrainer = await API.getOneTrainer(trainerId);
      // const trainTm = await API.getTrainerTm(trainerId);
      // setTm(trainTm);
      // navigate("/dashboard");

      setSelectedPicture(myPoke[0].img_url);
      setSelectedName(myPoke[0].name);
      setSelectedType(myPoke[0].type);
      setSelectedLevel(myPoke[0].level);
      setSelectedHp(myPoke[0].hp);
      // setSelectedPicture(myPoke[0].img_url);

      //move1
      setMove1Name(myPoke[0].move1.name);
      setMove1Power(myPoke[0].move1.power);
      setMove1Type(myPoke[0].move1.type);
      setMove1desc(myPoke[0].move1.desc);

      setMove2Name(myPoke[0].move2.name);
      setMove2Power(myPoke[0].move2.power);
      setMove2Type(myPoke[0].move2.type);
      setMove2desc(myPoke[0].move2.desc);

      setMove3Name(myPoke[0].move3.name);
      setMove3Power(myPoke[0].move3.power);
      setMove3Type(myPoke[0].move3.type);
      setMove3desc(myPoke[0].move3.desc);

      setMove4Name(myPoke[0].move4.name);
      setMove4Power(myPoke[0].move4.power);
      setMove4Type(myPoke[0].move4.type);
      setMove4desc(myPoke[0].move4.desc);

      // console.log("myPoke", myPoke);
      setSelectedTm(null);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const [allTms, setAllTms] = useState(props.myTrainerTm.TMs);

  const allPokemon = props.myTrainerDatas.pokemons;

   const allTms = props.myTrainerTm.TMs;

  useEffect(() => {
    const filteredTMs = allTms.filter((tm) => tm.name === selectedTm);
    console.log("filteredTMs", filteredTMs);
  }, [selectedTm]);

  const mainPokemon = allPokemon.filter((p) => p.isMain);

  // const caughtPokemon = mainPokemon.filter((p) => p.isCaught);

  const handleDropdownSelect = (eventKey) => {
    const selected = allTms.find((tm) => tm.TM_name === eventKey);
    setSelectedTm(selected);
  };

  const moveType1 = move1Type || mainPokemon[0].move1.type;
  const moveType2 = move2Type || mainPokemon[0].move2.type;
  const moveType3 = move3Type || mainPokemon[0].move3.type;
  const moveType4 = move4Type || mainPokemon[0].move4.type;

  let typeColor1 = "#000000";
  let typeColor2 = "#000000";
  let typeColor3 = "#000000";
  let typeColor4 = "#000000";

  const typeColors = {
    Normal: "#A8A77A",
    Steel: "#B8B8D0",
    Dark: "#705848",
    Fairy: "#D685AD",
    Fire: "#EE8130",
    Water: "#6390F0",
    Electric: "#F7D02C",
    Grass: "#7AC74C",
    Ice: "#96D9D6",
    Fighting: "#C22E28",
    Poison: "#A33EA1",
    Ground: "#E2BF65",
    Flying: "#A98FF3",
    Psychic: "#F95587",
    Bug: "#A6B91A",
    Rock: "#B6A136",
    Ghost: "#735797",
    Dragon: "#6F35FC",
  };

  if (typeColors.hasOwnProperty(moveType1)) {
    typeColor1 = typeColors[moveType1];
  }
  if (typeColors.hasOwnProperty(moveType2)) {
    typeColor2 = typeColors[moveType2];
  }
  if (typeColors.hasOwnProperty(moveType3)) {
    typeColor3 = typeColors[moveType3];
  }
  if (typeColors.hasOwnProperty(moveType4)) {
    typeColor4 = typeColors[moveType4];
  }

  return (
    <div className="">
      <div>
        <button onClick={handleToastClick}>Show Instructions</button>
        <Toast
          style={{
            position: "absolute",
            top: 100,
            left: 0,
          }}
          show={showToast}
          onClose={() => setShowToast(false)}
        >
          <Toast.Header>
            <strong className="mr-auto">Instructions</strong>
          </Toast.Header>
          <Toast.Body>
            On this page you're able to edit your Pokémon's moves.<br></br>{" "}
            <br></br>
            Select the drop-down: "change this ⬆️ move" below the move you want
            to change and select a TM from your current inventory.<br></br>
            <br></br>
            After you've made your pick click "Select", and the move will be
            updated! <br></br> <br></br>
            <strong>
              Please note: TM's can only be used once, and then they disappear
              from your inventory, so choose wisely!
            </strong>{" "}
            <br></br>
            <em>*Until you find them again in the "Find new TM" page</em>
            <br></br>
            <br></br>
            <em>
              Note: the move may not disappear from your selection list until
              page refresh
            </em>
          </Toast.Body>
        </Toast>
      </div>
      <Row className="justify-content-center">
        {mainPokemon.map((p) => (
          <Col
            key={p.id}
            className="d-flex justify-content-center align-items-center"
            style={{ paddingBottom: "95px" }}
          >
            <div
              className="prof-card pokemon-card2 "
              style={{
                background: "#f0f1c8",
                width: "800px",
                height: "1530px",
              }}
            >
              <div className=" card-content">
                <div
                  style={{
                    border: "none",
                    marginTop: "10px",
                    display: "flex",
                    fontSize: "150%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="font-text2"
                >
                  {selectedName || p.name}
                </div>
                <div className="">
                  <img
                    src={selectedPicture || p.img_url}
                    alt={selectedName || p.name}
                    style={{ width: "100%" }}
                  />
                </div>

                <Card.Body
                // style={{ background: "#f0f1c8"  }}
                >
                  <div style={{ display: "flex" }}>
                    <p className="font-text3">
                      Level {selectedLevel || p.level}&nbsp;&nbsp;
                    </p>
                    <p className="font-text3">HP {selectedHp || p.hp}</p>
                  </div>

                  <p
                    style={{
                      border: "none",
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="font-text3"
                  >
                    Type: {selectedType || p.type}
                  </p>
                </Card.Body>
                <ul
                  style={{
                    listStyleType: "none",
                    fontSize: "190%",
                    // paddingLeft: "50px",
                  }}
                >
                  <br />
                  <li
                    style={{
                      borderRadius: "10px",
                      // border: "1px solid black",
                      textAlign: "center",
                    }}
                  >
                    {move1Name || p.move1.name} - {move1Power || p.move1.power}{" "}
                    -{" "}
                    <span
                      style={{
                        background: typeColor1,
                        color: "white",
                        borderRadius: 30,
                        padding: "5px 10px",
                      }}
                    >
                      {moveType1}
                    </span>{" "}
                    - {move1Desc || p.move1.description}
                    <Button
                      id="move1"
                      onClick={handleButtonClick}
                      className="btn-primary choose-button d-flex justify-content-center align-items-center mx-auto"
                      style={{
                        marginRight: 10 + "px",
                        marginBottom: 10 + "px",
                        marginLeft: 10 + "px",
                        // paddingTop: 600 + "px",
                        paddingBottom: 0 + "px",
                        // background: "#f0f1c8",
                      }}
                    >
                      Change this ⬆️ Move
                    </Button>
                  </li>
                  <br />
                  <li
                    style={{
                      borderRadius: "10px",
                      textAlign: "center",

                      // fontFamily: "Arial",
                    }}
                  >
                    {move2Name || p.move2.name} - {move2Power || p.move2.power}{" "}
                    -{" "}
                    <span
                      style={{
                        background: typeColor2,
                        color: "white",
                        borderRadius: 30,
                        padding: "5px 10px",
                      }}
                    >
                      {moveType2}
                    </span>{" "}
                    - {move2Desc || p.move2.description}
                    <Button
                      id="move2"
                      onClick={handleButtonClick2}
                      className="btn-primary choose-button d-flex justify-content-center align-items-center mx-auto"
                      style={{
                        marginRight: 10 + "px",
                        marginBottom: 10 + "px",
                        marginLeft: 10 + "px",
                        // paddingTop: 600 + "px",
                        paddingBottom: 0 + "px",
                        // background: "#f0f1c8",
                      }}
                    >
                      Change this ⬆️ Move
                    </Button>
                  </li>
                  <br />
                  <li
                    style={{
                      borderRadius: "10px",
                      textAlign: "center",

                      // fontFamily: "Arial",
                    }}
                  >
                    {move3Name || p.move3.name} - {move3Power || p.move3.power}{" "}
                    -{" "}
                    <span
                      style={{
                        background: typeColor3,
                        color: "white",
                        borderRadius: 30,
                        padding: "5px 10px",
                      }}
                    >
                      {moveType3}
                    </span>{" "}
                    - {move3Desc || p.move3.description}
                    <Button
                      id="move3"
                      onClick={handleButtonClick3}
                      className="btn-primary choose-button d-flex justify-content-center align-items-center mx-auto"
                      style={{
                        marginRight: 10 + "px",
                        marginBottom: 10 + "px",
                        marginLeft: 10 + "px",
                        // paddingTop: 600 + "px",
                        paddingBottom: 0 + "px",
                        // background: "#f0f1c8",
                      }}
                    >
                      Change this ⬆️ Move
                    </Button>
                  </li>
                  <br />
                  <li
                    style={{
                      borderRadius: "10px",
                      textAlign: "center",

                      // fontFamily: "Arial",
                    }}
                  >
                    {move4Name || p.move4.name} - {move4Power || p.move4.power}{" "}
                    -{" "}
                    <span
                      style={{
                        background: typeColor4,
                        color: "white",
                        borderRadius: 30,
                        padding: "5px 10px",
                      }}
                    >
                      {moveType4}
                    </span>{" "}
                    - {move4Desc || p.move4.description}
                    <Button
                      id="move4"
                      onClick={handleButtonClick4}
                      className="btn-primary choose-button d-flex justify-content-center align-items-center mx-auto"
                      style={{
                        marginRight: 10 + "px",
                        marginBottom: 10 + "px",
                        marginLeft: 10 + "px",
                        // paddingTop: 600 + "px",
                        paddingBottom: 0 + "px",
                        // background: "#f0f1c8",
                      }}
                    >
                      Change this ⬆️ Move
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <div>
        <div className="d-flex justify-content-center align-items-center"></div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Choose a Move</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Dropdown onSelect={handleDropdownSelect}>
              <Dropdown.Toggle variant="secondary" id="dropdown-tm">
                {selectedTm ? selectedTm.TM_name : "Select a TM"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {allTms.map((tm) => (
                  <Dropdown.Item key={tm.id} eventKey={tm.TM_name}>
                    {tm.TM_name} - {tm.move.type} - Power {tm.move.power}
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
                handleSelectButtonClick(
                  props.trainerId,
                  mainPokemon[0].name,
                  selectedMoveId,
                  selectedTm.TM_name
                );
              }}
            >
              Select
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
// }
