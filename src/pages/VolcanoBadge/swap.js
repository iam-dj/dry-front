import React from "react";
import "./style.css";
import GymLeader_ from "./assets/DP-Brock.png";
import boulder from "./assets/boulder.png";
import API from "../../utils/API";
import BattleSys from "../../utils/BattleSys";
// import Button from "react-bootstrap/Button";
import GymLeader from "./GymLeader1.json";
import GymLeader2 from "./GymLeader2.json";
import GymLeader3 from "./GymLeader3.json";
import { useState, useEffect } from "react";

export default function BoulderBadge(props) {
  const cardStyle = {
    backgroundImage: `url(${boulder})`,
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
    maxHeight: "400px",
    maxWidth: "400px",
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

  const photoStyle = {
    maxWidth: "300px",
    maxHeight: "300px",
    minHeight: "300px",
    minWidth: "300px",
    objectFit: "contain",

    // display: "none",
  };
  const getGymLeaderPokemon = () =>
    JSON.parse(JSON.stringify(GymLeader[0].pokemons));
  const getGymLeader2Pokemon = () =>
    JSON.parse(JSON.stringify(GymLeader2[0].pokemons));
  const getGymLeader3Pokemon = () =>
    JSON.parse(JSON.stringify(GymLeader3[0].pokemons));
  //this is for the put route for a win
  const gymId = 1;
  // console.log(GymLeader[0].pokemons[0]);
  // console.log(GymLeader[0].pokemons[1]);
  // console.log(GymLeader[0].pokemons[2]);

  const showAlert = (alertMessage) => {
    window.alert(alertMessage);
  };

  const [isFetching, setIsFetching] = useState(false);

  const handleButtonClick = (buttonId) => {
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
            isGymMaster
          );
          //setting the state
          setBattleLog(battleLogData);
          console.log("battleLog", battleLog);
          console.log("battle result is working?", battleLogData);
          console.log("result", result);

          const handleWin = async () => {
            let experienceGained = 0;
            let levelChange = 0;
            let hpChange = 0;
            let gymStageChange = "";
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
                experienceGained = response.experienceGained;
                levelChange = response.levelChange;
                hpChange = response.hpChange;
                gymStageChange = response.gymStageChange;
              } else if (buttonId === "button2") {
                const response = await API.updateWinStage2(
                  props.trainerId,
                  gymId
                );
                console.log("battle sys Experience Change:", experienceGained);
                console.log("battle sys Level Change:", levelChange);
                console.log("battle sys HP Change:", hpChange);
                console.log("battle sys gymStageChange:", gymStageChange);
                experienceGained = response.experienceGained;
                levelChange = response.levelChange;
                hpChange = response.hpChange;
                gymStageChange = response.gymStageChange;
              } else if (buttonId === "button3") {
                const response = await API.updateWinStage3(
                  props.trainerId,
                  gymId
                );
                console.log("battle sys Experience Change:", experienceGained);
                console.log("battle sys Level Change:", levelChange);
                console.log("battle sys HP Change:", hpChange);
                console.log("battle sys gymStageChange:", gymStageChange);
                experienceGained = response.experienceGained;
                levelChange = response.levelChange;
                hpChange = response.hpChange;
                gymStageChange = response.gymStageChange;
              } else {
                console.log("Invalid button ID");
              }

              const alerts = [];
              alerts.push("You Won!");

              if (experienceGained > 0) {
                alerts.push(
                  `Your pokemon earned: ${experienceGained} experience!\n`
                );
              }
              if (levelChange > 0) {
                alerts.push(`Your Pokemon gained: ${levelChange} level!\n`);
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
              setPokemonChangeAlertWin(alertMessage);
            } catch (error) {
              console.log(error);
            }
          };

          const handleLoss = async () => {
            try {
              const { experienceChange, levelChange, hpChange } =
                await API.updateLoss(props.trainerId);
              console.log("battle sys Experience Change:", experienceChange);
              console.log("battle sys Level Change:", levelChange);
              console.log("battle sys HP Change:", hpChange);

              const alerts = [];
              alerts.push("You Lost... :(");
              if (experienceChange > 0) {
                alerts.push(
                  `Your pokemon earned: ${experienceChange} experience!\n`
                );
              }
              if (levelChange > 0) {
                alerts.push(`Your Pokemon gained: ${levelChange} level!\n`);
              }
              if (hpChange > 0) {
                alerts.push(
                  `After leveling up, your pokemon gained: ${hpChange} hp!\n`
                );
              }

              const alertMessage = alerts.join("\n");
              console.log("loss log", alerts);
              setPokemonChangeAlertLoss(alertMessage);
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
  useEffect(() => {
    console.log("useEffect triggered");
    console.log("battleLog:", battleLog);
    console.log("battleResult:", battleResult);
    console.log("pokemonChangeAlertWin:", pokemonChangeAlertWin);
    console.log("pokemonChangeAlertLoss:", pokemonChangeAlertLoss);
    let timeoutIds = [];
    let logIndex = 0;
    let charIndex = 0;

    const animateLogEntry = () => {
      if (logIndex >= battleLog.length) {
        if (battleResult === 1) {
          setIsFetching(false);
          showAlert(pokemonChangeAlertWin);
          console.log("useEffect log", pokemonChangeAlertWin);
        } else {
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
          logIndex += 5;
          setCurrentLogIndex(logIndex);
          console.log("logIndex", logIndex);
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

  return (
    <div style={cardStyle}>
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
      </div>
      <div className="row">
        <div className="col">
          <img style={imgStyle} src={GymLeader_} alt="Brock gym leader" />
          <p style={{ border: "10px solid gold", backgroundColor: "#f0f1c8", }} className="font-text text-center">
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
                onClick={() => handleButtonClick("button1")}
                disabled={isFetching}
              >
                First Challenge
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
              src={GymLeader2[0].pokemons[0].img_url}
              alt="Photo"
              className="card-img-top mx-auto"
            />
            <div className="card-body">
            <p className="font-text text-center">
                {GymLeader2[0].pokemons[0].name}
              </p>
              <button
                className="btn btn-primary mx-auto"
                style={{ display: "block", margin: "0 auto" }}
                onClick={() => handleButtonClick("button2")}
                disabled={isFetching}
              >
                Second Challenge!
                {/* {isFetching ? (
                  <img
                  src="https://media3.giphy.com/media/uOSl1zbbaw3sShbnNd/giphy.gif?cid=ecf05e47st36ri3i6qyehgyfh0klmb3mmpa4laq3kofpkbms&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                  alt="fetching-pokemon"
                  />
                  ) : (
                  "Fight GymLeader's Second Pokemon!"
                )} */}
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
                className="btn btn-primary mx-auto"
                style={{ display: "block", margin: "0 auto" }}
                onClick={() => handleButtonClick("button3")}
                disabled={isFetching}
              >
                Final Challenge!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
