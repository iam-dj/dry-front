import React, { useState } from "react";
import "./style.css";
import battlebg from "./assets/battle.jpg";
import BattleSys from "../../utils/BattleSys";
import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";
import NPC from "./npc.json";
import API from "../../utils/API";

export default function Train(props) {
  // const navigate = useNavigate();

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

          

          

          const myFilteredPokemons = filterMainPokemon(myTrainerData)

          console.log("myFilteredPokemons", myFilteredPokemons);

          setIsFetching(true);
          setTimeout(() => {
            setIsFetching(false);
             const result = BattleSys.startBattle(
              myFilteredPokemons, 
              NPCz[0].pokemons, 
              name

              );
              console.log('result',result)
              if (result === 1) {
                const winner = async () => {
                  try {
                    await API.updateWin(props.trainerId);
                    console.log("Win updated!");
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

  return (
    <>
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
