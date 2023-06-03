import React, { useEffect, useState } from "react";
import SetPokemon from "../../components/SetPokemon";
import API from "../../utils/API"; // Import the API package you are using
import battlebg from "./assets/setbg.jpg";

export default function SetPoke(props) {
  const [poke, setPoke] = useState();

  const cardStyle = {
    backgroundImage: `url(${battlebg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  };

  const storedData = localStorage.getItem("home_trainer_state");
  const pokemon = JSON.parse(storedData);

  // console.log("SetPoke props.trainer", pokemon);
  return (
    <>
    <div style={cardStyle}>
      <SetPokemon pokemon={pokemon} />
    </div>
    </>
  );
}
