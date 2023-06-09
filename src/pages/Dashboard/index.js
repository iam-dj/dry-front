import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import "./style.css";
import bfg from "./assets/bg.png";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokeDex from "../../components/PokeDex";
// import SetPoke from "../SetPoke";
import Badges from "../../components/Badges";
import Button from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { Background } from "@cloudinary/url-gen/qualifiers";

const STORAGE_KEY = "home_trainer_state";

export default function Dashboard(props) {
  useEffect(() => {
    if (!props.trainerId) {
      window.location.assign("/login");
    }
  }, [props.trainerId]);

  // const params = useParams();
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
    // backgroundSize: "auto",
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
        // localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
        <div >
          <div style={cardStyle} >
            <div 
            
            className="prof-card">
              <Row>
                <Col xs={12} md={4} className="image-col">
                  <img
                    className="profile "
                    alt="profile"
                    src={trainer.profilePicUrl}
                  />
                </Col>

                <Col xs={12} md={4}>
                  <Row>
                    <h1 className="profile-name font-text">{trainer.name}</h1>
                  </Row>
                  <Row>
                    <h2 className="profile-age">
                      <span className="age-heading">Age:</span> {trainer.age}
                    </h2>
                  </Row>
                  <br></br>
                  <Row>
                    <h6 className="profile-record">
                      <span className="age-heading">Record:</span>{" "}
                      <span className="numEffect">{trainer.numWins}</span> -{" "}
                      <span className="numEffect">{trainer.numLosses}</span>
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

                <Col xs={12} md={4}>
                  <Button variant="primary">Click me</Button>
                </Col>
              </Row>
            </div>

            <br />

            <PokeDex  style={{ paddingRight: 20 + "px" }} trainer={trainer} />
          </div>
        </div>
      )}
    </>
  );
}
