import React, { useState, useEffect } from "react";
import "./style.css";
import TrainInstructions from "../../components/TrainInstructions";
import battlebg from "./assets/battle.jpg";
import BattleSys from "../../utils/BattleSys";
import Health from "../../utils/HealthBar";
import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";
import NPC from "./npc.json";
import API from "../../utils/API";
import Toast from "react-bootstrap/Toast";
import ProgressBar from "@ramonak/react-progress-bar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Train(props) {
  // const navigate = useNavigate();
  useEffect(() => {
    if (!props.trainerId) {
      window.location.assign("/login");
    }
  }, [props.trainerId]);
  const [battleLog, setBattleLog] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBattleInProgress, setIsBattleInProgress] = useState(false);
  const [currentLogIndex, setCurrentLogIndex] = useState(20);
  const [currentCharIndex, setCurrentCharIndex] = useState({});
  const [renderedLogEntries, setRenderedLogEntries] = useState([]);
  const [pokemonChangeAlertWin, setPokemonChangeAlertWin] = useState([]);
  const [pokemonChangeAlertLoss, setPokemonChangeAlertLoss] = useState([]);
  const [pokemonChangeAlertLevel, setPokemonChangeAlertLevel] = useState([]);
  const [pokemonChangeAlertExperience, setPokemonChangeAlertExperience] =
    useState([]);
  const [pokemonChangeAlertHp, setPokemonChangeAlertHp] = useState([]);
  const [pokemonChangeAlertSpins, setPokemonChangeAlertSpins] = useState([]);
  const [battleResult, setBattleResult] = useState();
  const [trainerPokemon, setTrainerPokemon] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [npcPhoto, setNpcPhoto] = useState("");
  const [npcName, setNpcName] = useState("");
  const [npcTrainerPicture, setTrainerNpcPicture] = useState("");
  const [battleLogReaderSpeed, setbattleLogReaderSpeed] = useState(1000);
  const [maxBattleLogReaderSpeed, setMaxBattleLogReaderSpeed] = useState(false);
  const [healthBarRunning, setHealthBarRunning] = useState(false);
  const [healthBarSpeed, setHealthBarSpeed] = useState(2000);

  const [showToast, setShowToast] = useState(false);
  const handleToastClick = () => {
    setShowToast(true);
  };

  const topLeftImageStyle = {
    position: "absolute",
    top: 150,
    left: 0,
    width: "145px",
    height: "145px",
    objectFit: "cover",
    borderRadius: "25px",
  };

  const topRightImageStyle = {
    position: "absolute",
    top: 150,
    right: 0,
    width: "145px",
    height: "145px",
    objectFit: "contain",
    borderRadius: "25px",
    zIndex: 0,

  };
  const cardStyle = {
    backgroundImage: `url(${battlebg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 70px",
  };

  const photoStyle = {
    maxWidth: "320px",
    maxHeight: "320px",
    minHeight: "320px",
    minWidth: "320px",
    objectFit: "contain",


    // display: "none",
  };
  const trainerPic = {
    maxWidth: "320px",
    maxHeight: "320px",
    minHeight: "320px",
    minWidth: "320px",
    objectFit: "contain",
    // objectFit: "contain",

    // display: "none",
  };

  const fastForwardPicture = {
    maxWidth: "35px",
    maxHeight: "25px",
    minHeight: "25px",
    minWidth: "35px",
    // objectFit: "contain",
  };

  // useEffect(() => {

  //     setTrainerHealth((prevTrainerHealth) => prevTrainerHealth - NPCDamage);

  // }, [trainerHealth]);

  // useEffect(() => {

  //     setNPCHealth((prevTrainerHealth) => prevTrainerHealth - MyDamage);

  // }, [npcHealth]);

  // useEffect(() => {
  //   setTrainerHealth(10);
  // }, []);

  // useEffect(() => {
  //   setNPCHealth(10);
  // }, []);

  const showAlert = (alertMessage) => {
    window.alert(alertMessage);
  };

  const readerSpeedUp = () => {
    if (battleLogReaderSpeed < 1500)
      setbattleLogReaderSpeed((prevSpeed) => prevSpeed * 1.5);
    setHealthBarSpeed((prevSpeed) => prevSpeed - 500);
    console.log(battleLogReaderSpeed);
    if (battleLogReaderSpeed === 1500) setMaxBattleLogReaderSpeed(true);
  };

  const [isFetching, setIsFetching] = useState(false);
  const [trainPic, setTrainPic] = useState("");
  const [trainName, setTrainName] = useState("");
  const [compName, setCompName] = useState("");

  //healthbar states
  // const [NPCDamage, setNPCDamage] = useState();
  // const [MyDamage, setMyDamage] = useState();
  // const [npcHealth, setNPCHealth] = useState();
  // const [trainerHealth, setTrainerHealth] = useState();
  const [trainerHealthArray, setTrainerHealthArray] = useState([]);
  const [npcHealthArray, setNPCHealthArray] = useState([]);

  const handleButtonClick = () => {
    // setbattleLogReaderSpeed(3);
    setMaxBattleLogReaderSpeed(false);
    setEndGameReached(false);
    // console.log("you've chosen to battle:", trainerId);

    const generateBattle = async () => {
      try {
        const myTrainerData = await API.getOneTrainer(props.trainerId);

        const myTrainerData2 = await API.getBattlePoke(props.trainerId);
        // console.log("myTrainerData2.img_url", myTrainerData2[0].img_url);
        const randomNPC = NPC[Math.floor(Math.random() * NPC.length)];
        const NPCz = [randomNPC];
        // console.log("NPCz", NPCz[0].pokemons);
        const name = NPCz[0].name;

        setNpcPhoto(NPCz[0].pokemons[0].img_url);
        setNpcName(NPCz[0].pokemons[0].name);
        setTrainerNpcPicture(NPCz[0].npcPicture_url);
        setCompName(NPCz[0].name);

        setTrainName(myTrainerData.name);
        setTrainerPokemon(myTrainerData2[0].img_url);
        setTrainerName(myTrainerData2[0].name);
        setTrainPic(myTrainerData.profilePicUrl);

        function filterMainPokemon(myTrainerData) {
          return myTrainerData.pokemons.filter((pokemon) => pokemon.isMain);
        }

        const myFilteredPokemons = filterMainPokemon(myTrainerData);

        // console.log("myFilteredPokemons", myFilteredPokemons[0].name);
        const isGymMaster = false;
        setIsFetching(true);
        setTimeout(() => {
          // setIsFetching(false);
          // console.log("pre-battle", battleLog);

          setBattleLog([]);
          const { result, battleLogData, userHpArray, compHpArray } =
            BattleSys.startBattle(
              myFilteredPokemons,
              NPCz[0].pokemons,
              name,
              isGymMaster
            );

          // console.log("returned comp value in train.js", compHpArray);
          // console.log("returned user value in train.js", userHpArray);
          //       setNPCHealth(NPCHealth);
          // setTrainerHealth(trainerHealth);

          // console.log("MyDamage", MyDamage);
          // console.log("oppo damage", NPCDamage);

          // // setNPCHealth((prevNPCHealth) => prevNPCHealth - Math.random());
          // // setTrainerHealth((prevTrainerHealth) => prevTrainerHealth - Math.random());

          // console.log("npcHealth", npcHealth);
          // console.log("trainerHealth", trainerHealth);
          setTrainerHealthArray(userHpArray);
          setNPCHealthArray(compHpArray);
          setBattleLog(battleLogData);
          // console.log("battleResult after battle sys call", battleResult);

          // console.log("battle result is working?", battleLogData);
          // console.log("result", result);

          const handleWin = async () => {
            try {
              const alerts = [];
              const levelAlerts = [];
              const experienceAlerts = [];
              const hpAlerts = [];
              const spinAlerts = [];
              const {
                experienceGained,
                levelChange,
                hpChange,
                pokemonNewLevel,
              } = await API.updateWin(props.trainerId);
              // console.log("battle sys Experience Change:", experienceGained);
              // console.log("battle sys Level Change:", levelChange);
              // console.log("battle sys HP Change:", hpChange);

              alerts.push("You Won!                \n");
              if (experienceGained > 0) {
                alerts.push(
                  `Your pokemon earned: ${experienceGained} XP!                      \n`
                );
              }
              if (Math.random() < 0.2) {
                await API.getAddOneSpin(props.trainerId);
                alerts.push(
                  `You Earned another chance to catch a pokemon or find a TM!!                \n`
                );
              }
              if (levelChange > 0) {
                alerts.push(
                  `Your Pokemon is now level ${pokemonNewLevel}!                 \n`
                );
              }
              if (hpChange > 0) {
                alerts.push(
                  `After leveling up, your pokemon gained: ${hpChange} hp!                  \n`
                );
              }

              // const alertMessage = alerts.join("\n");
              // console.log("win Log", alerts);
              setPokemonChangeAlertWin(alerts);
              // setPokemonChangeAlertExperience(experienceAlerts);
              // setPokemonChangeAlertHp(hpAlerts);
              // setPokemonChangeAlertSpins(spinAlerts);
              // setPokemonChangeAlertLevel(levelAlerts);
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
              // console.log("battle sys Experience Change:", experienceChange);
              // console.log("battle sys Level Change:", levelChange);
              // console.log("battle sys HP Change:", hpChange);
              const levelAlerts = [];
              const experienceAlerts = [];
              const hpAlerts = [];
              const alerts = [];
              alerts.push("You Lost...                     ");
              if (experienceChange > 0) {
                alerts.push(
                  `Your pokemon earned: ${experienceChange} experience!                     \n`
                );
              }
              if (levelChange > 0) {
                alerts.push(
                  `Your Pokemon gained a level and is now level ${pokemonNewLevel}!                 \n`
                );
              }
              if (hpChange > 0) {
                alerts.push(
                  `After leveling up, your pokemon gained: ${hpChange} hp!               \n`
                );
              }

              // const alertMessage = alerts.join("\n");
              // console.log("loss log", alerts);
              setPokemonChangeAlertLoss(alerts);
              //        setPokemonChangeAlertExperience(experienceAlerts);
              // setPokemonChangeAlertHp(hpAlerts);
              // setPokemonChangeAlertLevel(levelAlerts);
              // console.log("Loss updated!");
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
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    };

    generateBattle();
  };

  const [endGameReached, setEndGameReached] = useState(false);

  //gets the value of updated hp out of the healthbar util
  useEffect(() => {
    // Perform actions that rely on the updated state
    // console.log("trainer hp array", trainerHealthArray);
    // console.log("NPC hp array", npcHealthArray);
    // console.log("battleLog", battleLog);
  }, [trainerHealthArray, npcHealthArray]);

  // useEffect(() => {
  //   let timeoutIds = [];
  //   let logIndex = 0;
  //   let charIndex = 0;

  //   const animateLogEntry = () => {
  //     if (logIndex >= battleLog.length || endGameReached) {
  //       if (battleResult === 1 && pokemonChangeAlertWin.length > 0) {
  //         setIsFetching(false);
  //         showAlert(pokemonChangeAlertWin);

  //         // console.log("useEffect log", pokemonChangeAlertWin);
  //       }
  //       if (battleResult === 0 && pokemonChangeAlertLoss.length > 0) {
  //         setIsFetching(false);
  //         showAlert(pokemonChangeAlertLoss);

  //         // console.log("useEffect log", pokemonChangeAlertLoss);
  //       }
  //       return;
  //     }

  //     const logEntry = battleLog[logIndex];
  //     // console.log(logEntry);

  //     const timeoutId = setTimeout(() => {
  //       setCurrentCharIndex((prevCharIndex) => ({
  //         ...prevCharIndex,
  //         [logIndex]: charIndex,
  //       }));

  //       charIndex++;

  //       if (charIndex > logEntry.length) {
  //         clearTimeout(timeoutId);

  //         // Move to the next log entry
  //         logIndex += battleLogReaderSpeed;
  //         setCurrentLogIndex(logIndex);
  //         // console.log("logIndex", logIndex);
  //         charIndex = 0;

  //         // Start animating the next log entry after a delay
  //         setTimeout(animateLogEntry, 2); // Adjust the delay duration as desired (in milliseconds)
  //       } else {
  //         // Continue animating the current log entry
  //         animateLogEntry();
  //       }
  //     }, 45); // Adjust the interval duration as desired (in milliseconds)

  //     timeoutIds.push(timeoutId);
  //   };

  //   // Start animating log entries when battleLog updates
  //   animateLogEntry();

  //   return () => {
  //     // Clear all the timeouts when component unmounts
  //     timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
  //   };
  // }, [
  //   battleLog,
  //   battleResult,
  //   pokemonChangeAlertWin,
  //   pokemonChangeAlertLoss,
  //   healthBarRunning,
  //   endGameReached,
  // ]);

  useEffect(() => {
    let timeoutIds = [];

    const displayLogs = () => {
      for (let i = 0; i < battleLog.length; i++) {
        const logEntry = battleLog[i];
        // console.log(logEntry);

        const timeoutId = setTimeout(() => {
          setCurrentLogIndex(i);

          if (i === battleLog.length - 1) {
            // Last log entry

            if (battleResult === 1 && pokemonChangeAlertWin.length > 0) {
              setIsFetching(false);
              displaySequentialAlerts(pokemonChangeAlertWin);
              setAlertShown(true);
            }
            if (battleResult === 0 && pokemonChangeAlertLoss.length > 0) {
              setIsFetching(false);
              displaySequentialAlerts(pokemonChangeAlertLoss);
              setAlertShown(true);
            }
          }
        }, 1000 * i); // Adjust the delay duration as desired (in milliseconds)

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
    endGameReached,
    battleResult,
    pokemonChangeAlertWin,
    pokemonChangeAlertLoss,
    battleLogReaderSpeed,
  ]);

  const [trainerHealth, setTrainerHealth] = useState(trainerHealthArray[0]);
  const [npcHealth, setNpcHealth] = useState(npcHealthArray[0]);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    setHealthBarRunning(true);

    const updateMeterValues = () => {
      let trainerIndex = 1;
      let npcIndex = 1;

      const trainerInterval = setInterval(() => {
        if (trainerIndex < trainerHealthArray.length) {
          setTrainerHealth(trainerHealthArray[trainerIndex]);
          // console.log("trainer:", trainerHealthArray[trainerIndex]);
          trainerIndex++;
          // console.log("trainer array length", trainerHealthArray.length);
          // console.log("trainer health", trainerHealth);
          // console.log("trainer index:", trainerIndex);
        } else {
          clearInterval(trainerInterval);
          // endGame(npcIndex, trainerIndex);
          // setHealthBarRunning(false);
        }
      }, healthBarSpeed); // Adjust the delay (in milliseconds) between each update

      const npcInterval = setInterval(() => {
        if (npcIndex < npcHealthArray.length) {
          setNpcHealth(npcHealthArray[npcIndex]);
          // console.log("npc:", npcHealthArray[npcIndex]);
          npcIndex++;
          // console.log("npc array length", npcHealthArray.length);
          // console.log("npc health", npcHealth);
          // console.log("npc index:", npcIndex);
        } else {
          clearInterval(npcInterval);
          // endGame(npcIndex, trainerIndex);
          // setHealthBarRunning(false);
        }
      }, healthBarSpeed); // Adjust the delay (in milliseconds) between each update
    };

    updateMeterValues();
  }, [
    trainerHealthArray,
    npcHealthArray,
    battleResult,
    pokemonChangeAlertWin,
    pokemonChangeAlertLoss,
  ]);

  useEffect(() => {
    let timeoutId = null;

    if (alertShown === true) {
      // console.log("state reset useffect is going off!", alertShown);
      timeoutId = setTimeout(() => {
        setBattleLog([]);
        //     setCurrentIndex(0);
        //     setIsBattleInProgress(false);
        //     setCurrentLogIndex(20);
        //     setCurrentCharIndex({});
        setRenderedLogEntries([]);
        //     setPokemonChangeAlertWin([]);
        //     setPokemonChangeAlertLoss([]);
        //     setTrainerPokemon("");
        //     setTrainerName("");
        setNpcPhoto("");
        setNpcName("");
        setTrainerNpcPicture("");
        //     setbattleLogReaderSpeed(6);
        //     setMaxBattleLogReaderSpeed(false);
        //     setHealthBarRunning(false);
        setbattleLogReaderSpeed(1000);
        setHealthBarSpeed(2000);
        setAlertShown(false);
        setTrainerHealth([1500]);
        setNpcHealth([1500]);
        setTrainerHealthArray([]);
        setNPCHealthArray([]);
        //     setTrainName("");
        setCompName("");
        setTrainPic("");
      }, 2000); // 3 seconds delay
    }

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts or the dependency changes before the delay
    };
  }, [alertShown]);

  return (
    <>
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
      <TrainInstructions></TrainInstructions>
      <div style={cardStyle} className="card-style">
        <div className="trainer-profile-photo">
          <img src={trainerPokemon} style={trainerPic} />
          <p className="font-text">{trainName}</p>
          <h3 className="font-text"> {trainerName}</h3>

          <label
            className="font-text"
            style={{ fontSize: "x-small" }}
            htmlFor="trainerMeter"
          >
            Health:
          </label>
          <ProgressBar
            customLabel=" "
            bgColor="#35b646"
            baseBgColor="#df460d"
            id="trainerMeter"
            min="0"
            maxCompleted={trainerHealthArray[0]}
            low="30"
            high="70"
            completed={trainerHealth}
          ></ProgressBar>

          {/* <meter id="disk_b" value={MyDamage} min="0" max="30" /> */}
          {trainPic && (
            <img src={trainPic} style={topLeftImageStyle} alt="Top Left" />
          )}

          {npcTrainerPicture && (
            <img
              src={npcTrainerPicture}
              style={topRightImageStyle}
              alt="Top Right"
            />
          )}
        </div>
        <div className="battle-log-overlay">
          <div className="battle-log">
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
          </div>
          {/* <button
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
          </button> */}
        </div>

        <div>
          <Button
            className="battle-button"
            style={{ margin: 0 }}
            variant="secondary"
            id="dropdown-battle"
            onClick={() => {
              handleButtonClick();
            }}
            disabled={isFetching}
          >
            {isFetching ? (
              <img
                className="gifConfig"
                src="https://media3.giphy.com/media/uOSl1zbbaw3sShbnNd/giphy.gif?cid=ecf05e47st36ri3i6qyehgyfh0klmb3mmpa4laq3kofpkbms&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                alt="fetching-pokemon"
              />
            ) : (
              "Battle NPC's"
            )}
          </Button>
        </div>
        <div className="npc-profile-photo">
          <img src={npcPhoto} style={photoStyle} />
          <p className="font-text">{compName}</p>
          <h3 className="font-text">{npcName}</h3>
          <label
            className="font-text"
            style={{ fontSize: "x-small" }}
            htmlFor="npcMeter"
          >
            Health:
          </label>
          <ProgressBar
            customLabel=" "
            bgColor="#35b646"
            baseBgColor="#df460d"
            id="npcMeter"
            min="0"
            maxCompleted={npcHealthArray[0]}
            low="30"
            high="70"
            completed={npcHealth}
          ></ProgressBar>
        </div>
      </div>
    </>
  );
}
