import React from "react";
import "./style.css";
import setbg from "./assets/setbg.jpg";
import holder from "./assets/holder.png";
import Col from "react-bootstrap/Col";
import PokeDex from "../../components/PokeDex";
import Buttons from "../../components/Buttons";

import ash from "./ash.json";

const RunPutFunction = async () => {
    try {
      // Fetch NPC data from the database
      // call API.SetFighter route to update isMain to true and set old isMain to false.
      
    } catch (error) {
      console.error("Error starting battle:", error);
    }
  };

export default function Home() {
 

  const pokemon = ash[0].pokemons;

  const cardStyle = {
    width: "30%",
    
  };

  return (
    <div>
     <div className="d-flex justify-content-center align-items-center">
      <img style={cardStyle} src={holder}></img>
      <button className="d-flex justify-content-center align-items-center" onClick={RunPutFunction}>I Choose You</button>
     </div>
      <PokeDex />
      {/* <Buttons /> */}
    </div>
  );
}
