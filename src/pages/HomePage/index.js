import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import bfg from "./assets/bg.png";


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
    justifyContent: "center",
    alignItems: "center",
  };

  const handleBattle = (trainerId) => {
    console.log("Battle with trainer:", trainerId);
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
                      className="profile img-fluid"
                      alt="profile"
                      src={trainer.profilePicUrl}
                    />
                    <Card.Title>{trainer.name}</Card.Title>
                    <Card.Text>Age: {trainer.age}</Card.Text>
                    <Card.Text>
                      Record: {trainer.numWins} 🥇 ➖ {trainer.numLosses} 🚫
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleBattle(trainer.id)}
                    >
                      Battle
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
