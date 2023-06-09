import React, { useEffect, useState } from "react";
import SetPokemon from "../../components/SetPokemon";
import API from "../../utils/API";
import battlebg from "./assets/setbg.jpg";

export default function SetPoke(props) {
  useEffect(() => {
    if (!props.trainerId) {
      window.location.assign("/login");
    }
  }, [props.trainerId]);
  
  const [myTrainerData, setMyTrainerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  const cardStyle = {
    backgroundImage: `url(${battlebg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    // maxHeight: "100vh",
  };

  const trainerId = props.trainerId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await API.getOneTrainer(props.trainerId);
        const trainInfo = data;
        console.log(trainInfo)
        setMyTrainerData(trainInfo);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Set loading state to false even if there's an error
      }
    };

    fetchData();
  }, [props.trainerId]);

  return (
    <div style={cardStyle}>
      {isLoading ? (
        <p>Loading...</p> // Render loading state while fetching data
      ) : (
        myTrainerData && (
          <SetPokemon myTrainerData={myTrainerData} trainerId={trainerId} />
        )
      )}
    </div>
  );
}
