import React, {useEffect, useState} from "react";
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

  useEffect(() => {
    if (props.token === null ) {
      navigate("/login");
    }
  }, [props.token]);

  const {
    name,
    age,
    profilePicUrl,
    numWins,
    numLosses,
    boulder_badge,
    cascade_badge,
    thunder_badge,
    rainbow_badge,
    soul_badge,
    marsh_badge,
    volcano_badge,
    earth_badge,
  } = ash[0];

  const cardStyle = {
    backgroundImage: `url(${bfg})`,
    backgroundSize: "auto",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    width: "100%",
    height: "auto",
  };
  const [trainer, setTrainer] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getOneTrainer(props.userId)
      .then((data) => {
        setTrainer(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {props.token ? (
    <div>
      <body style={cardStyle}>
        <Container className="card">
          <Row>
            <Col xs={4} md={3}>
              <img
                className="profile img-fluid"
                alt="profile"
                src={profilePicUrl}
              />
            </Col>
            <Col className="profile2">
              <h1 className="profile-name">{name}</h1>
              <h2 className="profile-age">Age: {age}</h2>
              <h6 className="profile-record">
                Record: {numWins} 🥇 ➖ {numLosses} 🚫
              </h6>
              <Badges
                badges={[
                  boulder_badge,
                  cascade_badge,
                  thunder_badge,
                  rainbow_badge,
                  soul_badge,
                  marsh_badge,
                  volcano_badge,
                  earth_badge,
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
