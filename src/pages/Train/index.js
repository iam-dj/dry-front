import React, { useState, useEffect } from "react";
import "./style.css";
import battlebg from "./assets/battle.jpg";
import BattleSys from "../../utils/BattleSys";
import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";
import NPC from "./npc.json";
import API from "../../utils/API";

export default function Train(props) {
  // const navigate = useNavigate();
  const [battleLog, setBattleLog] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBattleInProgress, setIsBattleInProgress] = useState(false);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState({});
  const [renderedLogEntries, setRenderedLogEntries] = useState([]);

  //this adds time interval to each state change

  const cardStyle = {
    backgroundImage: `url(${battlebg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [isFetching, setIsFetching] = useState(false);

  const handleButtonClick = () => {
    // console.log("you've chosen to battle:", trainerId);

    const generateBattle = async () => {
      try {
        const myTrainerData = await API.getOneTrainer(props.trainerId);

        const randomNPC = NPC[Math.floor(Math.random() * NPC.length)];
        const NPCz = [randomNPC];
        // console.log("NPCz", NPCz[0].pokemons);
        const name = NPCz[0].name;

        function filterMainPokemon(myTrainerData) {
          return myTrainerData.pokemons.filter((pokemon) => pokemon.isMain);
        }

        const myFilteredPokemons = filterMainPokemon(myTrainerData);

        // console.log("myFilteredPokemons", myFilteredPokemons[0].name);

        setIsFetching(true);
        setTimeout(() => {
          setIsFetching(false);
          console.log("pre-battle", battleLog);
          setBattleLog([]);
          const { result, battleLogData } = BattleSys.startBattle(
            myFilteredPokemons,
            NPCz[0].pokemons,
            name
          );
          //setting the state
          setBattleLog(battleLogData);
          console.log("battleLog", battleLog);
          console.log("battle result is working?", battleLogData);
          console.log("result", result);
          if (result === 1) {
            const winner = async () => {
              try {
                await API.updateWin(props.trainerId);
                console.log("Win updated!");
                const mypokename = myFilteredPokemons[0].name;
                const newHp = Math.floor(Math.random() * 16);
                console.log("newHp", newHp);
                if (newHp >= 7) {
                  await API.updatePokemonHp(props.trainerId, mypokename);
                  console.log(
                    `You've earned 15 health points for your pokemon!`
                  );
                }
              } catch (error) {
                console.log(error);
              }
            };

            winner();
          } else {
            const loser = async () => {
              try {
                await API.updateLoss(props.trainerId);
                console.log("Loss updated!");
              } catch (error) {
                console.log(error);
              }
            };

            loser();
          }
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    };

    generateBattle();
  };
  useEffect(() => {
    let timeoutIds = [];
    let logIndex = 0;
    let charIndex = 0;

    const animateLogEntry = () => {
      if (logIndex >= battleLog.length) return;

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
          setTimeout(animateLogEntry, 10); // Adjust the delay duration as desired (in milliseconds)
        } else {
          // Continue animating the current log entry
          animateLogEntry();
        }
      }, 40); // Adjust the interval duration as desired (in milliseconds)

      timeoutIds.push(timeoutId);
    };

    // Start animating log entries when battleLog updates
    animateLogEntry();

    return () => {
      // Clear all the timeouts when component unmounts
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [battleLog]);
  return (
    <>
      <div className="battle-log-overlay">
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
      </div>
      <div style={cardStyle}>
        <Button
          className="btn-danger"
          variant="secondary"
          id="dropdown-battle"
          onClick={() => handleButtonClick()}
          disabled={isFetching}
        >
          {isFetching ? (
            <img
              src="https://media3.giphy.com/media/uOSl1zbbaw3sShbnNd/giphy.gif?cid=ecf05e47st36ri3i6qyehgyfh0klmb3mmpa4laq3kofpkbms&ep=v1_gifs_search&rid=giphy.gif&ct=g"
              alt="fetching-pokemon"
            />
          ) : (
            "Battle NPC's to earn HP"
          )}
        </Button>
      </div>
    </>
  );
}
