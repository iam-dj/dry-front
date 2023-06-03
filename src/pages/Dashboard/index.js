import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import "./style.css";
import bfg from "./assets/bg.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokeDex from "../../components/PokeDex";
import SetPoke from "../SetPoke";
import Badges from "../../components/Badges";
import Button from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ash from "./ash.json";

const STORAGE_KEY = "home_trainer_state"; // Define the key for storing the state in localStorage

export default function Dashboard(props) {
  const params = useParams();
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState(() => {
    const storedState = localStorage.getItem(STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : null;
  });

  const [isLoading, setIsLoading] = useState(!trainer); // Set isLoading to true if trainer is not present in localStorage

  useEffect(() => {
    if (props.userId === null) {
      navigate("/login");
    }
  }, [props.userId]);

  const cardStyle = {
    backgroundImage: `url(${bfg})`,
    backgroundSize: "auto",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    width: "100%",
    height: "auto",
  };

  useEffect(() => {
    if (!trainer) {
      // Fetch the trainer data if not present in state
      setIsLoading(true); // Set isLoading to true before fetching the data
      API.getOneTrainer(props.trainerId)
        .then((data) => {
          setTrainer(data);
          setIsLoading(false);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); // Store the fetched trainer data in localStorage
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [props.trainerId, trainer]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <img src="https://media2.giphy.com/media/y1ZBcOGOOtlpC/giphy.gif?cid=ecf05e47k85t9m2qyl4mmumvieo89xc5yj3f1zyb23gax2r2&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
        </div>
      ) : (
        <div>
          <body style={cardStyle}>
            <Container className="card">
              <Row>
                <Col xs={4} md={3}>
                  <img
                    className="profile img-fluid"
                    alt="profile"
                    src={trainer.profilePicUrl}
                  />
                </Col>
                <Col className="profile2">
                  <h1 className="profile-name">{trainer.name}</h1>
                  <h2 className="profile-age">Age: {trainer.age}</h2>
                  <h6 className="profile-record">
                    Record: {trainer.numWins} 🥇 ➖ {trainer.numLosses} 🚫
                  </h6>
                  <Badges
                    trainer={trainer}
                    badges={[
                      trainer.boulder_badge,
                      trainer.cascade_badge,
                      trainer.thunder_badge,
                      trainer.rainbow_badge,
                      trainer.soul_badge,
                      trainer.marsh_badge,
                      trainer.volcano_badge,
                      trainer.earth_badge,
                    ]}
                  />
                </Col>

                <Col
                  xs={4}
                  md={3}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Button>Button</Button>
                </Col>
              </Row>
            </Container>

            <br />

            <PokeDex trainer={trainer} />
            <SetPoke trainer={trainer} />
          </body>
        </div>
      )}
    </>
  );
}
