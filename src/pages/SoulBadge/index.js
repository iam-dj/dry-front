import React from "react";
import "./style.css";
import janine from "./assets/janine_soul.png";
import soul from "./assets/soul.jpg";
import API from "../../utils/API";
import BattleSys from "../../utils/GymBattleSys";
// import Button from "react-bootstrap/Button";
import GymLeader from "./GymLeader1.json";
import GymLeader2 from "./GymLeader2.json";
import GymLeader3 from "./GymLeader3.json";
import { useState, useEffect } from "react";
import blainefight from "./assets/blainefight.mp4";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import GymInstructions from "../../components/GymInstructions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SoulBadge(props) {
  useEffect(() => {
    if (!props.trainerId) {
      window.location.assign("/login");
    }
  }, [props.trainerId]);

  const cardStyle = {
    backgroundImage: `url(${soul})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const imgStyle = {
    width: "220%",
    paddingRight: "130px",
    maxHeight: "600px",
    maxWidth: "600px",
    objectFit: "contain",
  };

  const pokePhotoStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
    minHeight: "200px",
    minWidth: "200px",
    objectFit: "contain",
  };
  const [battleLog, setBattleLog] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBattleInProgress, setIsBattleInProgress] = useState(false);
  const [currentLogIndex, setCurrentLogIndex] = useState(20);
  const [currentCharIndex, setCurrentCharIndex] = useState({});
  const [renderedLogEntries, setRenderedLogEntries] = useState([]);
  const [pokemonChangeAlertWin, setPokemonChangeAlertWin] = useState([]);
  const [pokemonChangeAlertLoss, setPokemonChangeAlertLoss] = useState([]);
  const [battleResult, setBattleResult] = useState();
  const [currentGymMasterPokemon, setCurrentGymMasterPokemon] = useState([]);
  const [currentGymStage, setCurrentGymStage] = useState([]);
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
  const [battleLogReaderSpeed, setbattleLogReaderSpeed] = useState(1300);
  const [maxBattleLogReaderSpeed, setMaxBattleLogReaderSpeed] = useState(false);
  const [BattleStatus, setBattleStatus] = useState(false);

  const photoStyle = {
    maxWidth: "300px",
    maxHeight: "300px",
    minHeight: "300px",
    minWidth: "300px",
    objectFit: "contain",

    // display: "none",
  };

  const fastForwardPicture = {
    maxWidth: "35px",
    maxHeight: "25px",
    minHeight: "25px",
    minWidth: "35px",
    // objectFit: "contain",
  };

  const getGymLeaderPokemon = () =>
    JSON.parse(JSON.stringify(GymLeader[0].pokemons));
  const getGymLeader2Pokemon = () =>
    JSON.parse(JSON.stringify(GymLeader2[0].pokemons));
  const getGymLeader3Pokemon = () =>
    JSON.parse(JSON.stringify(GymLeader3[0].pokemons));
  //this is for the put route for a win
  const gymId = 5;
  // console.log(GymLeader[0].pokemons[0]);
  // console.log(GymLeader[0].pokemons[1]);
  // console.log(GymLeader[0].pokemons[2]);

  const showAlert = (alertMessage) => {
    window.alert(alertMessage);
  };

  const readerSpeedUp = () => {
    setbattleLogReaderSpeed((prevSpeed) => prevSpeed - 100);
    console.log(battleLogReaderSpeed);
    if (battleLogReaderSpeed === 500) setMaxBattleLogReaderSpeed(true);
  };

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchCurrentGymStage = async () => {
      const response = await API.getOneTrainer(props.trainerId);

      const mainPokemon = response.pokemons.filter((pokemon) => pokemon.isMain);
      console.log("This useEffect is triggered!", mainPokemon);
      setCurrentGymStage(mainPokemon[0].gymFiveStage);
    };

    fetchCurrentGymStage();
  }, [props.trainerId, BattleStatus]);

  const handleButtonClick = (buttonId) => {
    setBattleStatus(true);
    setMaxBattleLogReaderSpeed(false);
    setAlertShown(false);
    console.log(currentGymMasterPokemon);
    console.log(GymLeader);
    console.log("pokemon 1", GymLeader[0].pokemons);
    console.log("pokemon 2", GymLeader2[0].pokemons);
    console.log("pokemon 3", GymLeader3[0].pokemons);

    const generateBattle = async () => {
      let selectedPokemon = [];

      const isGymMaster = true;
      try {
        const myTrainerData = await API.getOneTrainer(props.trainerId);
        if (buttonId === "button1") {
          selectedPokemon = getGymLeaderPokemon();
          console.log("you clicked button 1", GymLeader[0].pokemons);
        } else if (buttonId === "button2") {
          selectedPokemon = getGymLeader2Pokemon();
          console.log("you clicked button 2", GymLeader2[0].pokemons);
        } else if (buttonId === "button3") {
          selectedPokemon = getGymLeader3Pokemon();
          console.log("you clicked button 3", GymLeader3[0].pokemons);
        }

        function filterMainPokemon(myTrainerData) {
          return myTrainerData.pokemons.filter((pokemon) => pokemon.isMain);
        }
        console.log(myTrainerData);
        const myFilteredPokemons = filterMainPokemon(myTrainerData);
        let gymStage = myFilteredPokemons[0].gymFiveStage;
        setCurrentGymStage(gymStage);
        console.log("gym stage:", gymStage);
        // console.log("myFilteredPokemons", myFilteredPokemons[0].name);
        console.log("selected pokemon", selectedPokemon);
        setIsFetching(true);
        setTimeout(() => {
          // setIsFetching(false);
          console.log("pre-battle", battleLog);
          setBattleLog([]);
          const { result, battleLogData } = BattleSys.startBattle(
            myFilteredPokemons,
            selectedPokemon,
            GymLeader[0].name,
            isGymMaster,
            myFilteredPokemons[0].soulBadgeVictory
          );
          //setting the state
          setBattleLog(battleLogData);
          // console.log("battleLog", battleLog);
          console.log("battle result is working?", battleLogData);
          // console.log("result", result);

          const handleWin = async () => {
            let experienceGained = 0;
            let levelChange = 0;
            let hpChange = 0;
            let gymStageChange = "";
            let pokemonNewLevel = 0;
            try {
              if (buttonId === "button1") {
                const response = await API.updateWinStage1(
                  props.trainerId,
                  gymId
                );
                console.log("battle sys Experience Change:", experienceGained);
                console.log("battle sys Level Change:", levelChange);
                console.log("battle sys HP Change:", hpChange);
                console.log("battle sys gymStageChange:", gymStageChange);
                console.log("battle sys pokemonNewLevel:", pokemonNewLevel);
                experienceGained = response.experienceGained;
                levelChange = response.levelChange;
                hpChange = response.hpChange;
                gymStageChange = response.gymStageChange;
                pokemonNewLevel = response.pokemonNewLevel;
              } else if (buttonId === "button2") {
                const response = await API.updateWinStage2(
                  props.trainerId,
                  gymId
                );
                console.log("battle sys Experience Change:", experienceGained);
                console.log("battle sys Level Change:", levelChange);
                console.log("battle sys HP Change:", hpChange);
                console.log("battle sys gymStageChange:", gymStageChange);
                console.log("battle sys pokemonNewLevel:", pokemonNewLevel);
                experienceGained = response.experienceGained;
                levelChange = response.levelChange;
                hpChange = response.hpChange;
                gymStageChange = response.gymStageChange;
                pokemonNewLevel = response.pokemonNewLevel;
              } else if (buttonId === "button3") {
                const response = await API.updateWinStage3(
                  props.trainerId,
                  gymId
                );
                console.log("battle sys Experience Change:", experienceGained);
                console.log("battle sys Level Change:", levelChange);
                console.log("battle sys HP Change:", hpChange);
                console.log("battle sys gymStageChange:", gymStageChange);
                console.log("battle sys pokemonNewLevel:", pokemonNewLevel);
                experienceGained = response.experienceGained;
                levelChange = response.levelChange;
                hpChange = response.hpChange;
                gymStageChange = response.gymStageChange;
                pokemonNewLevel = response.pokemonNewLevel;
              } else {
                console.log("Invalid button ID");
              }

              const alerts = [];
              alerts.push("You Won!\n");

              if (experienceGained > 0) {
                alerts.push(
                  `Your pokemon earned ${experienceGained} experience!\n`
                );
              }
              if (levelChange > 0) {
                alerts.push(`Your Pokemon gained ${levelChange} level!\n`);
                alerts.push(`Your Pokemon is now level ${pokemonNewLevel}!\n`);
              }
              if (hpChange > 0) {
                alerts.push(
                  `After leveling up, your pokemon gained: ${hpChange} hp!\n`
                );
              }
              if (gymStageChange) {
                alerts.push(gymStageChange + "\n");
              }

              const alertMessage = alerts.join("\n");
              console.log("win Log", alertMessage);
              setPokemonChangeAlertWin(alerts);
            } catch (error) {
              console.log(error);
            }
          };

          const handleLoss = async () => {
            try {
              const {
                experienceChange,
                levelChange,
                hpChange,
                pokemonNewLevel,
              } = await API.updateLoss(props.trainerId);
              console.log("battle sys Experience Change:", experienceChange);
              console.log("battle sys Level Change:", levelChange);
              console.log("battle sys HP Change:", hpChange);
              console.log("battle sys pokemonNewLevel:", pokemonNewLevel);

              const alerts = [];
              alerts.push("You Lost... ");
              if (experienceChange > 0) {
                alerts.push(
                  `Your pokemon earned ${experienceChange} experience!\n`
                );
              }
              if (levelChange > 0) {
                alerts.push(`Your Pokemon gained ${levelChange} level!\n`);
                alerts.push(`Your Pokemon is now level ${pokemonNewLevel}!\n`);
              }
              if (hpChange > 0) {
                alerts.push(
                  `After leveling up, your pokemon gained: ${hpChange} hp!\n`
                );
              }

              const alertMessage = alerts.join("\n");
              console.log("loss log", alerts);
              setPokemonChangeAlertLoss(alerts);
              console.log("Loss updated!");
            } catch (error) {
              console.log(error);
            }
          };
          if (result === 1) {
            console.log("buttonId", buttonId);
            setBattleResult(1);
            handleWin(buttonId, gymId);
            // selectedPokemon = [];
          } else if (result === 0) {
            setBattleResult(0);
            handleLoss(buttonId);
            console.log("buttonId", buttonId);
            // selectedPokemon = [];
          }
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    };

    generateBattle();
  };
  const [alertShown, setAlertShown] = useState(false);
  useEffect(() => {
    let timeoutIds = [];

    const displayLogs = () => {
      for (let i = 0; i < battleLog.length; i++) {
        const logEntry = battleLog[i];

        const timeoutId = setTimeout(() => {
          setCurrentLogIndex(i);

          if (i === battleLog.length - 1) {
            // Last log entry

            if (battleResult === 1 && pokemonChangeAlertWin.length > 0) {
              setIsFetching(false);
              setBattleStatus(false);
              displaySequentialAlerts(pokemonChangeAlertWin);
              setAlertShown(true);
            }
            if (battleResult === 0 && pokemonChangeAlertLoss.length > 0) {
              setIsFetching(false);
              setBattleStatus(false);
              displaySequentialAlerts(pokemonChangeAlertLoss);
              setAlertShown(true);
            }
          }
        }, battleLogReaderSpeed * i); // Adjust the delay duration as desired (in milliseconds)

        timeoutIds.push(timeoutId);
      }
    };

    const displaySequentialAlerts = async (alertArray) => {
      for (let i = 0; i < alertArray.length; i++) {
        const alert = alertArray[i];
        await displayAlertWithDelay(alert, i * 1000);
      }
    };

    const displayAlertWithDelay = (alert, delay) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          toast(alert, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          resolve();
        }, delay);
      });
    };

    // Display logs when battleLog updates
    displayLogs();

    return () => {
      // Clear all the timeouts when component unmounts
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [
    battleLog,
    battleResult,
    pokemonChangeAlertWin,
    pokemonChangeAlertLoss,
    battleLogReaderSpeed,
  ]);

  useEffect(() => {
    let timeoutId = null;

    if (alertShown === true) {
      console.log("state reset useffect is going off!", alertShown);
      timeoutId = setTimeout(() => {
        setBattleLog([]);
        setRenderedLogEntries([]);
        setAlertShown(false);
        setPokemonChangeAlertLoss([]);
        setPokemonChangeAlertWin([]);
        setbattleLogReaderSpeed(1300);
      }, 2000); // 3 seconds delay
    }

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts or the dependency changes before the delay
    };
  }, [alertShown]);

  return (
    <div style={cardStyle}>
      <GymInstructions />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="battle-log-overlay">
        <div className="battle-log">
          {battleLog.map((logEntry, index) => (
            <p
              className="font-text"
              key={index}
              style={{ display: index === currentLogIndex ? "block" : "none" }}
            >
              {logEntry.slice(0, currentCharIndex[index])}
            </p>
          ))}
        </div>
        <button
          // style={fastForwardPicture}
          className="btn btn-dark"
          onClick={() => readerSpeedUp()}
          disabled={maxBattleLogReaderSpeed}
        >
          <img
            style={fastForwardPicture}
            src="https://res.cloudinary.com/duaznt4wg/image/upload/v1686164391/fast_forward_pnzr2e.png"
            alt="Speed Up"
          />
        </button>
      </div>
      <div className="row">
        <div className="col">
          <img style={imgStyle} src={janine} alt="Brock gym leader" />
          <p
            style={{ border: "10px solid gold", backgroundColor: "#f0f1c8" }}
            className="font-text text-center"
          >
            {GymLeader[0].name}
          </p>
        </div>
        <div className="col">
          <div
            className="card"
            style={{ border: "10px solid gold", backgroundColor: "#f0f1c8" }}
          >
            <img
              style={{
                ...pokePhotoStyle,
                // boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
              }}
              src={GymLeader[0].pokemons[0].img_url}
              alt="Photo"
              className="card-img-top mx-auto"
            />
            <div className="card-body">
              <p className="font-text text-center">
                {GymLeader[0].pokemons[0].name}
              </p>

              <button
                className="btn btn-primary mx-auto"
                style={{ display: "block", margin: "0 auto" }}
                onClick={() => {
                  handleButtonClick("button1");
                  handleVideoModalOpen();
                }}
                disabled={isFetching}
              >
                First Challenge
              </button>
            </div>
            <Modal
              show={showVideoModal}
              onHide={handleVideoModalClose}
              centered
            >
              <Modal.Body>
                <video
                  style={{ width: "95%", height: "95%" }}
                  controls
                  autoPlay
                >
                  <source src={blainefight} type="video/mp4" />
                </video>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleVideoModalClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <div className="col">
          <div
            className="card"
            style={{ border: "10px solid gold", backgroundColor: "#f0f1c8" }}
          >
            <img
              style={pokePhotoStyle}
              src={GymLeader2[0].pokemons[0].img_url}
              alt="Photo"
              className="card-img-top mx-auto"
            />
            <div className="card-body">
              <p className="font-text text-center">
                {GymLeader2[0].pokemons[0].name}
              </p>
              <button
                className={`btn btn-primary mx-auto ${
                  currentGymStage < 2 ? "disabled-button" : ""
                }`}
                style={{ display: "block", margin: "0 auto" }}
                onClick={() => {
                  handleButtonClick("button2");
                  handleVideoModalOpen();
                }}
                disabled={currentGymStage < 2 || isFetching}
              >
                {currentGymStage < 2
                  ? "Defeat previous pokemon to unlock"
                  : "Second Challenge"}
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div
            className="card"
            style={{ border: "10px solid gold", backgroundColor: "#f0f1c8" }}
          >
            <img
              style={pokePhotoStyle}
              src={GymLeader3[0].pokemons[0].img_url}
              alt="Photo"
              className="card-img-top mx-auto"
            />
            <div className="card-body">
              <p className="font-text text-center">
                {GymLeader3[0].pokemons[0].name}
              </p>
              <button
                className={`btn btn-primary mx-auto ${
                  currentGymStage < 3 ? "disabled-button" : ""
                }`}
                style={{ display: "block", margin: "0 auto" }}
                onClick={() => {
                  handleButtonClick("button3");
                  handleVideoModalOpen();
                }}
                disabled={currentGymStage < 3 || isFetching}
              >
                {currentGymStage < 3
                  ? "Defeat previous pokemon to unlock"
                  : "Final Challenge"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
