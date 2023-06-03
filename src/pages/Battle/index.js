import React, { useState , useEffect} from "react";
import "./style.css";
import battlebg from "./assets/battle.jpg";
// import { fetchNPCData, simulateBattle } from "./pokemon_db"; // Example functions for fetching NPC data and simulating battle
import BattleSys from "../../utils/BattleSys"; // Example functions for fetching NPC data and simulating battle
import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import ash from "./ash.json"



export default function Battle(props) {
  const navigate = useNavigate();

  // console.log(props.token)
  useEffect(() => {
    if (props.token == null ) {
      navigate("/login");
    }
  }, [props.token]);
  

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

  const [show, setShow] = useState(false);

  const startBattleWithNPC = async () => {
    try {
      // Fetch NPC data from the database
      // const npcData = await fetchNPCData(); // Replace with your implementation of fetching NPC data
      
      // Simulate battle between player and NPC
       // Replace with your implementation of simulating battle
      
      console.log(); // Do something with the battle result, e.g., display it to the user
    } catch (error) {
      console.error("Error starting battle:", error);
    }
  };

  const [isFetching, setIsFetching] = useState(false);

  const handleButtonClick = () => {
    const storedData = localStorage.getItem("home_trainer_state");
const trainerData = storedData ? JSON.parse(storedData) : null;
console.log('trainerData',trainerData);

function filterMainPokemon(trainerData) {
  return trainerData.pokemons.filter(pokemon => pokemon.isMain);
}

// function filterPokemon(ash) {
//   return ash.pokemons.filter(pokemon => pokemon.isMain);
// }
// const filteredAsh = filterPokemon(ash);

const filteredPokemons = filterMainPokemon(trainerData);

console.log('filteredPokemons',filteredPokemons);

const filteredAsh = ash[0].pokemons;

    setIsFetching(true);
    // Perform any necessary actions here
    setTimeout(() => {
      setIsFetching(false);
      BattleSys.startBattle(filteredPokemons, filteredAsh)
    }, 3000); // Simulating a delay before resetting the state

  };

  return (
    <>
      <div style={cardStyle}>
      <div>
        <p>check the console log</p>
        </div>
      <Button
        className="btn-danger"
        variant="secondary"
        id="dropdown-battle"
        onClick={handleButtonClick}
        disabled={isFetching}
      >
        {isFetching ? (
          <img
            src="https://media3.giphy.com/media/uOSl1zbbaw3sShbnNd/giphy.gif?cid=ecf05e47st36ri3i6qyehgyfh0klmb3mmpa4laq3kofpkbms&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="fetching-pokemon"
          />
        ) : (
          "Battle Your Pokemon"
        )}
      </Button>
    </div>
  </>
  );
}
