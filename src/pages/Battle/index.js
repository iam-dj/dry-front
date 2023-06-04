import React, { useState, useEffect } from "react";
import "./style.css";
import battlebg from "./assets/battle.jpg";
import BattleSys from "../../utils/BattleSys";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import NPC from "./npc.json";
import API from "../../utils/API";

export default function Battle(props) {
  const navigate = useNavigate();

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

  const handleButtonClick = (trainerId) => {
    console.log('hello');
    
    if (trainerId == props.trainerId) {
      console.log("you can't battle yourself");
    } else {
      console.log("you've chosen to battle:", trainerId);

      const generateBattle = async (trainerId) => {
        try {
          const myTrainerData = await API.getBattlePoke(props.trainerId);
          console.log("myTrainerData", myTrainerData);

          const randomNPC = NPC[Math.floor(Math.random() * NPC.length)];
          // console.log("randomNPC", randomNPC.pokemon_1);

          function filterMainPokemon(myTrainerData) {
            return myTrainerData.pokemons.filter((pokemon) => pokemon.isMain);
          }

          const myFilteredPokemons = filterMainPokemon(myTrainerData);

          setIsFetching(true);
          setTimeout(() => {
            setIsFetching(false);
            // const result = BattleSys.startBattle(
            //   myFilteredPokemons,
            //   randomNPC.pokemon_1
            // );
            // console.log(result);
            // if () {
            //   //update the wins
            //   //update the hp
            //   //update localstorage
            // } else {
            //   //update losses
            // }
          }, 3000);
        } catch (error) {
          console.log(error);
        }
      };

      generateBattle(trainerId);
    }
  };

  return (
    <>
      <div style={cardStyle}>
        <Button
          className="btn-danger"
          variant="secondary"
          id="dropdown-battle"
          onClick={() => handleButtonClick(props.trainerId)}
          disabled={isFetching}
        >
          {isFetching ? (
            <img
              src="https://media3.giphy.com/media/uOSl1zbbaw3sShbnNd/giphy.gif?cid=ecf05e47st36ri3i6qyehgyfh0klmb3mmpa4laq3kofpkbms&ep=v1_gifs_search&rid=giphy.gif&ct=g"
              alt="fetching-pokemon"
            />
          ) : (
            "Check console to see NPC Battle"
          )}
        </Button>
      </div>
    </>
  );
}
