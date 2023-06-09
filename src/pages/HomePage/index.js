import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import bfg from "./assets/bg.png";
import BattleSys from "../../utils/BattleSys";
import Fight from "./assets/fight.mp4";
import poke from "./assets/pokemon.png";
import "./style.css";

const ALL_TRAINERS = "all_trainer_state";

export default function HomePage(props) {
  useEffect(() => {
    if (!props.trainerId) {
      window.location.assign("/login");
    }
  }, [props.trainerId]);
  
  const [myWins, setMyWins] = useState();
  const [myLoss, setMyLoss] = useState();
  const [show, setShow] = useState(false);
  const [battleLog, setBattleLog] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBattleInProgress, setIsBattleInProgress] = useState(false);
  const [currentLogIndex, setCurrentLogIndex] = useState(20);
  const [currentCharIndex, setCurrentCharIndex] = useState({});
  const [renderedLogEntries, setRenderedLogEntries] = useState([]);
  const [pokemonChangeAlertWin, setPokemonChangeAlertWin] = useState([]);
  const [pokemonChangeAlertLoss, setPokemonChangeAlertLoss] = useState([]);
  const [battleResult, setBattleResult] = useState();
  const [trainerPhoto, setTrainerPhoto] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [npcPhoto, setNpcPhoto] = useState("");
  const [npcName, setNpcName] = useState("");

  const [loadedTrainer, setLoadedTrainer] = useState(() => {
    const storedData = localStorage.getItem(ALL_TRAINERS);
    return storedData ? JSON.parse(storedData) : null;
  });

  const [isLoading, setIsLoading] = useState(!loadedTrainer);

  const cardStyle = {
    backgroundImage: `url(${bfg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    // maxHeight: "100vh",
    // display: "flex",
    // justifyContent: "center",
  };
  const cardStylee = {
    width: "250px",
    height: "250px",
    objectFit: "cover",
  };

  const showAlert = (alertMessage) => {
    window.alert(alertMessage);
  };

  const [isFetching, setIsFetching] = useState(false);

  const handleBattle = (trainerId) => {
    if (trainerId === props.trainerId) {
      console.log("you can't battle yourself");
    } else {
      console.log("you've chosen to battle:", trainerId);

      //run api on trainer id and return the pokemon isMain
      const fetchBattlePokemon = async (trainerId) => {
        try {
          const opp = await API.getBattlePoke(trainerId);
          const opponentData = await API.getOneTrainer(trainerId);

          const myTrainerData = await API.getOneTrainer(props.trainerId);

          const name = opponentData.name;

          function filterMainPokemon(myTrainerData) {
            return myTrainerData.pokemons.filter((pokemon) => pokemon.isMain);
          }

          const myFilteredPokemons = filterMainPokemon(myTrainerData);
          // const oppFilteredPokemons = filterMainPokemon(myTrainerData);

          setIsFetching(true);
          const isGymMaster = false;
          setTimeout(() => {
            // setIsFetching(false);
            // console.log("pre-battle", battleLog);
            setBattleLog([]);
            const { result, battleLogData } = BattleSys.startBattle(
              myFilteredPokemons,
              opp,
              name,
              isGymMaster
            );
            //setting the state
            setBattleLog(battleLogData);
            console.log("battleLog", battleLog);
            console.log("battle result is working?", battleLogData);
            console.log("result", result);

            const handleWin = async () => {
              try {
                // const { experienceGained, levelChange, hpChange } =
                //   await API.updateWin(props.trainerId);
                // console.log("battle sys Experience Change:", experienceGained);
                // console.log("battle sys Level Change:", levelChange);
                // console.log("battle sys HP Change:", hpChange);

                const alerts = [];
                alerts.push("You Won!");
                // if (experienceGained > 0) {
                //   alerts.push(
                //     `Your pokemon earned: ${experienceGained} experience!\n`
                //   );
                // }
                // if (levelChange > 0) {
                //   alerts.push(`Your Pokemon gained: ${levelChange} level!\n`);
                // }
                // if (hpChange > 0) {
                //   alerts.push(
                //     `After leveling up, your pokemon gained: ${hpChange} hp!\n`
                //   );
                // }

                const alertMessage = alerts.join("\n");
                // console.log("win Log", alerts);
                setPokemonChangeAlertWin(alertMessage);
              } catch (error) {
                console.log(error);
              }
            };

            const handleLoss = async () => {
              try {
                // const { experienceChange, levelChange, hpChange } =
                //   await API.updateLoss(props.trainerId);
                // console.log("battle sys Experience Change:", experienceChange);
                // console.log("battle sys Level Change:", levelChange);
                // console.log("battle sys HP Change:", hpChange);

                const alerts = [];
                alerts.push("You Lost... :(");
                // if (experienceChange > 0) {
                //   alerts.push(
                //     `Your pokemon earned: ${experienceChange} experience!\n`
                //   );
                // }
                // if (levelChange > 0) {
                //   alerts.push(`Your Pokemon gained: ${levelChange} level!\n`);
                // }
                // if (hpChange > 0) {
                //   alerts.push(
                //     `After leveling up, your pokemon gained: ${hpChange} hp!\n`
                //   );
                // }

                const alertMessage = alerts.join("\n");
                console.log("loss log", alerts);
                setPokemonChangeAlertLoss(alertMessage);
                console.log("Loss updated!");
              } catch (error) {
                console.log(error);
              }
            };

            if (result === 1) {
              setBattleResult(1);
              handleWin();
            } else if (result === 0) {
              setBattleResult(0);
              handleLoss();
            }
          }, 30);
        } catch (error) {
          console.log(error);
        }
      };

      fetchBattlePokemon(trainerId);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await API.getAllTrainers();
        setLoadedTrainer(data);
        setIsLoading(false);
        // localStorage.setItem(ALL_TRAINERS, JSON.stringify(data));
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    if (!loadedTrainer) {
      setIsLoading(true);
      fetchData();
    }
  }, [loadedTrainer]);

  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleVideoModalOpen = () => {
    setShowVideoModal(true);
    setTimeout(() => {
      setShowVideoModal(false);
    }, 8000);
  };

  const handleVideoModalClose = () => {
    setShowVideoModal(false);
  };

  useEffect(() => {
    let timeoutIds = [];
    let logIndex = 0;
    let charIndex = 0;

    const animateLogEntry = () => {
      if (logIndex >= battleLog.length) {
        if (battleResult === 1) {
          setIsFetching(false);
          showAlert(pokemonChangeAlertWin);
          console.log("useEffect log", pokemonChangeAlertWin);
        }
        if (battleResult === 0) {
          setIsFetching(false);
          showAlert(pokemonChangeAlertLoss);
          console.log("useEffect log", pokemonChangeAlertLoss);
        }
        return;
      }

      const logEntry = battleLog[logIndex];
      console.log(logEntry);

      const timeoutId = setTimeout(() => {
        setCurrentCharIndex((prevCharIndex) => ({
          ...prevCharIndex,
          [logIndex]: charIndex,
        }));

        charIndex++;

        if (charIndex > logEntry.length) {
          clearTimeout(timeoutId);

          // Move to the next log entry
          logIndex += 8;
          setCurrentLogIndex(logIndex);
          // console.log("logIndex", logIndex);
          charIndex = 0;

          // Start animating the next log entry after a delay
          setTimeout(animateLogEntry, 5); // Adjust the delay duration as desired (in milliseconds)
        } else {
          // Continue animating the current log entry
          animateLogEntry();
        }
      }, 20); // Adjust the interval duration as desired (in milliseconds)

      timeoutIds.push(timeoutId);
    };

    // Start animating log entries when battleLog updates
    animateLogEntry();

    return () => {
      // Clear all the timeouts when component unmounts
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [battleLog, battleResult, pokemonChangeAlertWin, pokemonChangeAlertLoss]);

  // console.log("trainerPhoto", trainerPhoto);

  return (
    <>
      <div style={cardStyle}>
        <Container
          style={{
            marginBottom: 25 + "px",
            // border: "10px solid gold",
          }}
        >
          <img
            src={poke}
            className="profile32 mx-auto d-block"
            alt="logo for pokemon"
          ></img>
          <Row className="justify-content-center">
            {isLoading ? (
              // Loading state
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              loadedTrainer.map((trainer) => (
                <Col key={trainer.id} xs={12} md={6} lg={4}>
                  <div
                    className="card"
                    style={{
                      marginBottom: 25 + "px",
                      border: "10px solid gold",
                    }}
                  >
                    <Card.Body>
                      <Row>
                        <Col className="col-4">
                          <Row>
                            <img
                              style={{
                                width: 100 + "px",
                                height: 50 + "px",
                                objectFit: "cover",
                              }}
                              src={trainer.profilePicUrl}
                              alt="trainer profile"
                            />
                          </Row>
                        </Col>
                        <Col className="col-8">
                          <Row className="profile-name2">{trainer.name}</Row>
                          <Row>
                            <h6 className="profile-record2 justify-content-center">
                              <span
                                className="age-heading"
                                style={{
                                  marginBottom: 50 + "px",
                                  marginTop: 50 + "px",
                                  // paddingBottom: 25 + "px",
                                }}
                              >
                                Record:
                              </span>{" "}
                              <span className="">{trainer.numWins}</span> -{" "}
                              <span className="">{trainer.numLosses}</span>
                            </h6>
                            <br />
                            <br />
                          </Row>
                        </Col>
                      </Row>
                      
                      {/* <div className="mx-auto d-block">
                        <p className="text-center " >Current Main Pokemon</p>
                      </div> */}

                      <div className="d-flex justify-content-between">
                        <Button
                          variant="primary mx-auto d-block"
                          onClick={() => {
                            handleBattle(trainer.id);
                            handleVideoModalOpen();
                          }}
                          className="btn-sm"
                          type="button"
                        >
                          Friendly Battle
                        </Button>
                        <Button
                          // style={{ marginTop: 5 + "px" }}
                          variant="primary mx-auto d-block"
                          className="btn-sm"
                          type="button"
                          onClick={() => setShow(true)}
                        >
                          Show Battlelog
                        </Button>
                      </div>

                      <Modal
                        show={showVideoModal}
                        onHide={handleVideoModalClose}
                        centered
                      >
                        <Modal.Body>
                          <video controls autoPlay>
                            <source src={Fight} type="video/mp4" />
                          </video>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={handleVideoModalClose}
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Card.Body>
                  </div>
                </Col>
              ))
            )}
          </Row>
        </Container>
        <Row>
          <Col xs={6}>
            <Toast
              style={{
                width: 2000 + "px",
                position: "absolute",
                left: 50 + "%",
                transform: "translateX(-50%)",
              }}
              onClose={() => setShow(false)}
              show={show}
              delay={9000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Dry Pokemon</strong>
              </Toast.Header>
              <Toast.Body>
                {battleLog.map((logEntry, index) => (
                  <p
                    className="font-text"
                    key={index}
                    style={{
                      display: index === currentLogIndex ? "block" : "none",
                    }}
                  >
                    {logEntry.slice(0, currentCharIndex[index])}
                  </p>
                ))}
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
      </div>
    </>
  );
}
