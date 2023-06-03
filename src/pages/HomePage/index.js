import React, { useEffect, useState } from "react";
import API from "../../utils/API"; 
import AllTrainers from "../../components/AllTrainers";

const All_Trainers = "all_trainer_state";

export default function Home() {
  const [loadedTrainer, setLoadedTrainer] = useState(() => {
    const storedData = localStorage.getItem(All_Trainers);
    return storedData ? JSON.parse(storedData) : null;
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loadedTrainer) {
      // Fetch the trainer data if not present in state
      API.getAllTrainers()
        .then((data) => {
          setLoadedTrainer(data);
          setIsLoading(false);
          localStorage.setItem(All_Trainers, JSON.stringify(data)); // Store the fetched trainer data in localStorage
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [loadedTrainer]);

  console.log('loadedTrainer', loadedTrainer);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <AllTrainers loadedTrainer={loadedTrainer} />
      )}
    </div>
  );
}

