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
import { Background } from "@cloudinary/url-gen/qualifiers";

const STORAGE_KEY = "home_trainer_state";

export default function Dashboard(props) {
  const params = useParams();
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState(() => {
    const storedState = localStorage.getItem(STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : null;
  });

  const [isLoading, setIsLoading] = useState(!trainer);

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
    // width: "100%",
    // height: "auto",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await API.getOneTrainer(props.trainerId);
        setTrainer(data);
        console.log("data", data);
        setIsLoading(false);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    if (!trainer) {
      fetchData();
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
            <Container className="prof-card">
              <Row>
                <Col className="col-4 image-col ">
                  <img
                    className="profile "
                    alt="profile"
                    src={trainer.profilePicUrl}
                  />
                </Col>
                <Col className="col-4">
                  <Row>
                    <h1 className="profile-name">{trainer.name}</h1>
                  </Row>
                  <Row>
                    <h2 className="profile-age"> <span className="age-heading" >Age:</span> {trainer.age}</h2>
                    </Row>
                  <Row>
                    <h6 className="profile-record">
                    <span className="age-heading" >Record:</span> <span className="numEffect">{trainer.numWins}</span> - <span className="numEffect">{trainer.numLosses}</span> 
                    </h6>
                    </Row>
                  <Row>
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
                  </Row>
                </Col>

                <Col
                  xs={4}
                  md={3}
                  className=" col-4 "
                  // d-flex justify-content-center align-items-center"
                >
                  <Button>Button</Button>
                </Col>
              </Row>
            </Container>

            <br />

            <PokeDex trainer={trainer} />
          </body>
        </div>
      )}
    </>
  );
}
