import React, { useEffect, useState } from "react";
import SetPokemon from "../../components/SetPokemon";
import API from "../../utils/API";
import battlebg from "./assets/setbg.jpg";

export default function SetPoke(props) {
  const [myTrainerData, setMyTrainerData] = useState(null); // Declare myTrainerData in component scope

  const cardStyle = {
    backgroundImage: `url(${battlebg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

  const trainerId = props.trainerId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await API.getOneTrainer(props.trainerId);
        setMyTrainerData(data); // Store the fetched data in myTrainerData state
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [props.trainerId]);

  return (
    <div style={cardStyle}>
      {myTrainerData && (
        <SetPokemon myTrainerData={myTrainerData} trainerId={trainerId} />
      )}
    </div>
  );
}
