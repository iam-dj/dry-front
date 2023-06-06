import React, { useState } from "react";
import bfg from "./assets/bg.png";
// import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import API from "../../utils/API";
import PokeDex from "../../components/PokeDex";
import Toast from "react-bootstrap/Toast";

export default function Catch(props) {
  const cardStyle = {
    backgroundImage: `url(${bfg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const pokemonNames = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
    "Fearow",
    "Ekans",
    "Arbok",
    "Pikachu",
    "Raichu",
    "Sandshrew",
    "Sandslash",
    "Nidoran♀",
    "Nidorina",
    "Nidoqueen",
    "Nidoran♂",
    "Nidorino",
    "Nidoking",
    "Clefairy",
    "Clefable",
    "Vulpix",
    "Ninetales",
    "Jigglypuff",
    "Wigglytuff",
    "Zubat",
    "Golbat",
    "Oddish",
    "Gloom",
    "Vileplume",
    "Paras",
    "Parasect",
    "Venonat",
    "Venomoth",
    "Diglett",
    "Dugtrio",
    "Meowth",
    "Persian",
    "Psyduck",
    "Golduck",
    "Mankey",
    "Primeape",
    "Growlithe",
    "Arcanine",
    "Poliwag",
    "Poliwhirl",
    "Poliwrath",
    "Abra",
    "Kadabra",
    "Alakazam",
    "Machop",
    "Machoke",
    "Machamp",
    "Bellsprout",
    "Weepinbell",
    "Victreebel",
    "Tentacool",
    "Tentacruel",
    "Geodude",
    "Graveler",
    "Golem",
    "Ponyta",
    "Rapidash",
    "Slowpoke",
    "Slowbro",
    "Magnemite",
    "Magneton",
    "Farfetch'd",
    "Doduo",
    "Dodrio",
    "Seel",
    "Dewgong",
    "Grimer",
    "Muk",
    "Shellder",
    "Cloyster",
    "Gastly",
    "Haunter",
    "Gengar",
    "Onix",
    "Drowzee",
    "Hypno",
    "Krabby",
    "Kingler",
    "Voltorb",
    "Electrode",
    "Exeggcute",
    "Exeggutor",
    "Cubone",
    "Marowak",
    "Hitmonlee",
    "Hitmonchan",
    "Lickitung",
    "Koffing",
    "Weezing",
    "Rhyhorn",
    "Rhydon",
    "Chansey",
    "Tangela",
    "Kangaskhan",
    "Horsea",
    "Seadra",
    "Goldeen",
    "Seaking",
    "Staryu",
    "Starmie",
    "Mr. Mime",
    "Scyther",
    "Jynx",
    "Electabuzz",
    "Magmar",
    "Pinsir",
    "Tauros",
    "Magikarp",
    "Gyarados",
    "Lapras",
    "Ditto",
    "Eevee",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Porygon",
    "Omanyte",
    "Omastar",
    "Kabuto",
    "Kabutops",
    "Aerodactyl",
    "Snorlax",
    "Articuno",
    "Zapdos",
    "Moltres",
    "Dratini",
    "Dragonair",
    "Dragonite",
    "Mewtwo",
    "Mew",
  ];

  const [isFetching, setIsFetching] = useState(false);
  const [isToast, setIsToast] = useState('');
  const [isTrainer, setIsTrainer] = useState()
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => {
      setIsToast('');
      setShowA(false);
  }

  const handleButtonClick = () => {
    const getPoke = async () => {
      try {
        // const allPokemon = await API.getAllPoke();

        const randPoke =
          pokemonNames[Math.floor(Math.random() * pokemonNames.length)];

        console.log("poke", randPoke);

        await API.catchPokemon(props.trainerId, randPoke);
        const data = await API.getOneTrainer(props.trainerId);
        setIsTrainer(data);
        console.log("data", data);

        setIsFetching(true);
        setTimeout(() => {
          setIsFetching(false);

          // alert(`Congrats you captured a ${randPoke}`);
          setIsToast(`You caught a ${randPoke}`);
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    };

    getPoke();
  };

  return (
    <div style={cardStyle}>
      <Button
        className="btn-danger"
        variant="secondary"
        id="dropdown-battle"
        onClick={()=>{handleButtonClick();
          toggleShowA();}}
        disabled={isFetching}
      >
        {isFetching ? (
          <img
            src="https://media3.giphy.com/media/dGD5YHl8xW6c/giphy.gif?cid=ecf05e479h8f5shzhb7oypucnalyj5v7bg5quyve5p2dpznb&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="fetching-pokemon"
          />
        ) : (
          "Catch 'em All"
        )}
        <Toast>
          <Toast.Body style={{ backgroundColor: "white",borderRadius: "10px", color: "black" }}>{isToast}</Toast.Body>
        </Toast>
      </Button>
      {/* <PokeDex isTrainer={isTrainer}/> */}
    </div>
  );
}
