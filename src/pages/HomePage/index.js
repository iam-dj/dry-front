import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import bfg from "./assets/bg.png";
import BattleSys from "../../utils/BattleSys"; // Example functions for fetching NPC data and simulating battle
import HandleWins from "../../utils/HandleWins";

const ALL_TRAINERS = "all_trainer_state";

export default function HomePage(props) {
  const [loadedTrainer, setLoadedTrainer] = useState(() => {
    const storedData = localStorage.getItem(ALL_TRAINERS);
    return storedData ? JSON.parse(storedData) : null;
  });

  const [isLoading, setIsLoading] = useState(!loadedTrainer);

  const cardStyle = {
    backgroundImage: `url(${bfg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  };
  const cardStylee = {
    width: "250px",
    height: "250px",
    objectFit: "cover",
  };

  const [isFetching, setIsFetching] = useState(false);

  const handleBattle = (trainerId) => {
    if (trainerId == props.trainerId) {
      console.log("you can't battle yourself");
    } else {
      console.log("you've chosen to battle:", trainerId);

      //run api on trainer id and return the pokemon isMain
      const fetchBattlePokemon = async (trainerId) => {
        try {
          const opponentData = await API.getBattlePoke(trainerId);

          const myTrainerData = await API.getOneTrainer(props.trainerId);

          console.log("Battle Pokemon opponentData:", opponentData);

          function filterMainPokemon(myTrainerData) {
            return myTrainerData.pokemons.filter((pokemon) => pokemon.isMain);
          }

          const myFilteredPokemons = filterMainPokemon(myTrainerData);

          setIsFetching(true);
          setTimeout(() => {
            setIsFetching(false);
            const result = BattleSys.startBattle(
              myFilteredPokemons,
              opponentData
            );
            console.log(result);
            if (result === 1) {
              //update the wins
              //update the hp
              //update localstorage
            } else {
              //update losses
            }
          }, 3000);
        } 
        catch (error) {
          console.log(error);
        }
      };

      fetchBattlePokemon(trainerId);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await API.getAllTrainers();
        setLoadedTrainer(data);
        setIsLoading(false);
        localStorage.setItem(ALL_TRAINERS, JSON.stringify(data));
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    if (!loadedTrainer) {
      setIsLoading(true);
      fetchData();
    }
  }, [loadedTrainer]);

  return (
    <div style={cardStyle}>
      <Container>
        <Row className="justify-content-center">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            loadedTrainer.map((trainer) => (
              <Col key={trainer.id} xs={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <img
                      className="profile img-fluid mx-auto d-block"
                      alt="profile"
                      src={trainer.profilePicUrl}
                      style={cardStylee}
                    />
                    <Card.Title>{trainer.name}</Card.Title>
                    <Card.Text>Age: {trainer.age}</Card.Text>
                    <Card.Text>
                      Record: {trainer.numWins} 🥇 ➖ {trainer.numLosses} 🚫
                    </Card.Text>
                    <Button
                      variant="primary mx-auto d-block"
                      onClick={() => handleBattle(trainer.id)}
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
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}
