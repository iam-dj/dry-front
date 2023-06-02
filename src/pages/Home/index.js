import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import "./style.css";
import bfg from "./assets/bg.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokeDex from "../../components/PokeDex";
import Badges from "../../components/Badges";
import Button from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ash from "./ash.json";

export default function Home(props) {
  const params = useParams();
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState();

  const [isLoading, setIsLoading] = useState(true);

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
    API.getOneTrainer(props.trainerId)
      .then((data) => {
        console.log("data", data);
        setTrainer(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(trainer);
  return (
    <>
      {trainer ? (
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

            <PokeDex />
          </body>
        </div>
      ) : (
        <h1>Login to see page!</h1>
      )}
    </>
  );
}
