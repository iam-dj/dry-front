import React, { useEffect, useState } from 'react';
import SetPokemon from "../../components/SetPokemon";
import API from "../../utils/API"; // Import the API package you are using

export default function SetPoke(props) {
  const [poke, setPoke] = useState();

  const storedData = localStorage.getItem('home_trainer_state');
  const pokemon = JSON.parse(storedData);
  
  console.log('SetPoke props.trainer',pokemon)
  return (
    <div>
      <SetPokemon pokemon={pokemon} />
    </div>
  );
}
