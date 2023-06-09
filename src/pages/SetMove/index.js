import React, { useEffect, useState } from "react";
import SetAttackMove from "../../components/SetAttackMove";
import API from "../../utils/API";
import battlebg from "./assets/setbg.jpg";

export default function SetMove(props) {
  useEffect(() => {
    if (!props.trainerId) {
      window.location.assign("/login");
    }
  }, [props.trainerId]);
  
  const [myTrainerDatas, setMyTrainerDatas] = useState(null);
  const [myTrainerTm, setMyTrainerTm] = useState(null);
  const [isLoadings, setIsLoadings] = useState(true); 

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
        const trainTm= await API.getTrainerTm(trainerId);

        const trainInfo = data;
        const tmInfo = trainTm;
        console.log(trainInfo)
        setMyTrainerDatas(trainInfo);
        setMyTrainerTm(tmInfo);

        setIsLoadings(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.log(error);
        setIsLoadings(false); // Set loading state to false even if there's an error
      }
    };

    fetchData();
  }, [props.trainerId]);

  return (
    <div style={cardStyle}>
      {isLoadings ? (
        <p>Loading...</p> 
      ) : (
        myTrainerDatas && (
          <SetAttackMove myTrainerDatas={myTrainerDatas} myTrainerTm={myTrainerTm} trainerId={trainerId} />
        )
      )}
    </div>
  );
}
