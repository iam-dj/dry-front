import React, { useState, useEffect, useCallback } from "react";
import pokevideo from "./assets/pokeVideo.mp4";
import Button from "react-bootstrap/Button";
import API from "../../utils/API";
import Toast from "react-bootstrap/Toast";
import PB from "./assets/pokeball.png";

export default function Catch(props) {
  const handleToastClick = () => {
    setShowToast(true);
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
  const [isToast, setIsToast] = useState("");
  const [isTrainer, setIsTrainer] = useState();
  const [showA, setShowA] = useState(true);
  const [showPoke, setShowPoke] = useState("");
  const [showToast, setShowToast] = useState(false);

  const pokeBallImageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1024px-Pok%C3%A9_Ball_icon.svg.png";
  const [hasChances, setHasChances] = useState();

  const decrementChances = useCallback(async () => {
    setHasChances((prevChances) => Math.max(prevChances - 2, 0));

    try {
      await API.getSubtractSpins(props.trainerId);
    } catch (error) {
      console.log(error);
    }
  }, [props.trainerId]);

  useEffect(() => {
    setShowPoke(pokeBallImageUrl);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await API.getNumSpins(props.trainerId);
        setHasChances(data.numSpins || 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = useCallback(async () => {
    if (hasChances > 0) {
      try {
        setIsFetching(true);

        const allPokemon = await API.getAllPoke();
        const randPoke =
          pokemonNames[Math.floor(Math.random() * pokemonNames.length)];

        await API.catchPokemon(props.trainerId, randPoke);
        const data = await API.getOneTrainer(props.trainerId);

        setIsTrainer(data);

        decrementChances();

        const foundPoke = allPokemon.find(
          (pokemon) => pokemon.name === randPoke
        );

        if (foundPoke) {
          setTimeout(() => {
            setShowPoke(foundPoke.img_url);
          }, 1000);
        } else {
          console.log("Pokemon not found.");
        }

        setTimeout(() => {
          setShowPoke(pokeBallImageUrl);
          setIsToast("");
        }, 5000);

        setTimeout(() => {
          setIsFetching(false);
          setIsToast(`You caught a ${randPoke}`);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No more chances left!");
      // Handle logic when there are no more chances left
    }
  }, [props.trainerId, hasChances, decrementChances]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 150,
          right: 300,
          backgroundColor: "#dc3545",
          padding: "5px",
          borderRadius: "5px",
          color: "white",
        }}
      >
        <p style={{ fontWeight: "bold" }}># of spin(s) left:</p>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "300%",
            background: "white",
            color: "black",
          }}
        >
          {hasChances >= 0 ? hasChances : 0}
        </span>
      </div>

      <div style={{ position: "relative" }}>
        <video
          src={pokevideo}
          type="video/mp4"
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Toast className="mx-auto">
                <Toast.Body
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    color: "black",
                  }}
                >
                  {isToast}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                      src={showPoke}
                      alt="Pokemon"
                    />
                  </div>
                </Toast.Body>
              </Toast>
              <Button
                className="btn-danger mx-auto"
                variant="secondary"
                id="dropdown-battle"
                onClick={handleButtonClick}
                disabled={isFetching || hasChances === 0}
              >
                {isFetching ? (
                  <img
                    src="https://media3.giphy.com/media/dGD5YHl8xW6c/giphy.gif?cid=ecf05e479h8f5shzhb7oypucnalyj5v7bg5quyve5p2dpznb&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    alt="fetching-pokemon"
                  />
                ) : (
                  "Get a New Pokemon for 2 Spins"
                )}
              </Button>
              <div>
                <button onClick={handleToastClick}>Show Instructions</button>
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                  <Toast.Header>
                    <strong className="mr-auto">Instructions</strong>
                  </Toast.Header>
                  <Toast.Body>
                    It's time to catch Pokemon! Click the button and give it a
                    spin! Note: It costs 2 spins per click -- if you want to
                    earn more spins go train or battle gym masters!
                  </Toast.Body>
                </Toast>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
