import React from "react";
import "./style.css";
import brock from "./assets/DP-Brock.png";
import boulder from "./assets/boulder.png";
import API from "../../utils/API";
import BattleSys from "../../utils/BattleSys";
import Button from "react-bootstrap/Button";
import Brock from "./brock.json";
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
    paddingRight: "20px",
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

  // console.log(Brock[0].pokemons[0]);
  // console.log(Brock[0].pokemons[1]);
  // console.log(Brock[0].pokemons[2]);

  const showAlert = (alertMessage) => {
    window.alert(alertMessage);
  };

  const [isFetching, setIsFetching] = useState(false);

  const handleButtonClick = (buttonId) => {
    console.log(currentGymMasterPokemon);
    const generateBattle = async () => {
      let selectedPokemon;
      if (buttonId === "button1") {
        selectedPokemon = Brock[0].pokemons[0];
        console.log("you clicked button 1", Brock[0].pokemons[0]);
      } else if (buttonId === "button2") {
        console.log("you clicked button 2", Brock[0].pokemons[1]);
        selectedPokemon = Brock[0].pokemons[1];
      } else if (buttonId === "button3") {
        console.log("you clicked button 3", Brock[0].pokemons[2]);
        selectedPokemon = Brock[0].pokemons[2];
      }
      if (selectedPokemon) {
        try {
          const myTrainerData = await API.getOneTrainer(props.trainerId);

          function filterMainPokemon(myTrainerData) {
            return myTrainerData.pokemons.filter((pokemon) => pokemon.isMain);
          }

          const myFilteredPokemons = filterMainPokemon(myTrainerData);

          // console.log("myFilteredPokemons", myFilteredPokemons[0].name);

          setIsFetching(true);
          setTimeout(() => {
            // setIsFetching(false);
            console.log("pre-battle", battleLog);
            setBattleLog([]);
            const { result, battleLogData } = BattleSys.startBattle(
              myFilteredPokemons,
              selectedPokemon,
              Brock[0].name
            );
            //setting the state
            setBattleLog(battleLogData);
            console.log("battleLog", battleLog);
            console.log("battle result is working?", battleLogData);
            console.log("result", result);

            const handleWin = async () => {
              try {
                const { experienceGained, levelChange, hpChange } =
                  await API.updateWin(props.trainerId);
                console.log("battle sys Experience Change:", experienceGained);
                console.log("battle sys Level Change:", levelChange);
                console.log("battle sys HP Change:", hpChange);

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

                const alertMessage = alerts.join("\n");
                console.log("win Log", alerts);
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
              setBattleResult(1);
              handleWin();
            } else if (result === 0) {
              setBattleResult(0);
              handleLoss();
            }
          }, 3000);
        } catch (error) {
          console.log(error);
        }
      }
    };

    generateBattle();
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
          logIndex += 8;
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
      {/* <div className="battle-log-overlay">
        <div className="battle-log">
          {battleLog.map((logEntry, index) => (
            <p
              key={index}
              style={{ display: index === currentLogIndex ? "block" : "none" }}
            >
              {logEntry.slice(0, currentCharIndex[index])}
            </p>
          ))}
        </div>
      </div> */}
      <div className="row">
        <div className="col">
          <img style={imgStyle} src={brock} alt="Image" />
        </div>
        <div className="col">
          <div className="card">
            <img
              style={pokePhotoStyle}
              src={Brock[0].pokemons[0].img_url}
              alt="Photo"
              className="card-img-top"
            />
            <div className="card-body">
              <button
                className="btn btn-primary"
                onClick={() => handleButtonClick("button1")}
                disabled={isFetching}
              >
                {isFetching ? (
                  <img
                    src="https://media3.giphy.com/media/uOSl1zbbaw3sShbnNd/giphy.gif?cid=ecf05e47st36ri3i6qyehgyfh0klmb3mmpa4laq3kofpkbms&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    alt="fetching-pokemon"
                  />
                ) : (
                  "Fight Brock's first Pokemon!"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img
              style={pokePhotoStyle}
              src={Brock[0].pokemons[1].img_url}
              alt="Photo"
              className="card-img-top"
            />
            <div className="card-body">
              <button
                className="btn btn-primary"
                onClick={() => handleButtonClick("button2")}
                disabled={isFetching}
              >
                {isFetching ? (
                  <img
                    src="https://media3.giphy.com/media/uOSl1zbbaw3sShbnNd/giphy.gif?cid=ecf05e47st36ri3i6qyehgyfh0klmb3mmpa4laq3kofpkbms&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    alt="fetching-pokemon"
                  />
                ) : (
                  "Fight Brock's Second Pokemon!"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img
              style={pokePhotoStyle}
              src={Brock[0].pokemons[2].img_url}
              alt="Photo"
              className="card-img-top"
            />
            <div className="card-body">
              <button
                className="btn btn-primary"
                onClick={() => handleButtonClick("button3")}
                disabled={isFetching}
              >
                {isFetching ? (
                  <img
                    src="https://media3.giphy.com/media/uOSl1zbbaw3sShbnNd/giphy.gif?cid=ecf05e47st36ri3i6qyehgyfh0klmb3mmpa4laq3kofpkbms&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    alt="fetching-pokemon"
                  />
                ) : (
                  "Fight Brock's Third Pokemon!"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
