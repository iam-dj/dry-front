import React, { useState, useEffect } from "react";
import "./style.css";
import setbg from "./assets/setbg.jpg";
// import holder from "./assets/holder.png";
import PokeDex from "../../components/PokeDex";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

import ash from "./ash.json";

const RunPutFunction = async () => {
  try {
    // Fetch NPC data from the database
    // Call API.SetFighter route to update isMain to true and set old isMain to false.
  } catch (error) {
    console.error("Error starting battle:", error);
  }
};

export default function SetPoke(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.token === null) {
      navigate("/login");
    }
  }, [props.token]);

  const pokemon = ash[0].pokemons;

  const cardStyle = {
    width: "30%",
    backgroundImage: `url(${setbg})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    width: "100%",
  };

  const [showIsMainPoke, setshowIsMainPoke] = useState(true);

  const caughtPokemon = showIsMainPoke
    ? pokemon.filter((p) => p.isMain)
    : pokemon;

  return (
    <>
      {props.token ? (
        <div className="center-container">
          <div className="center-content">
            {/* <img style={cardStyle} src={holder} alt="Holder" /> */}
            {caughtPokemon.map((p) => (
              <Col
                key={p.id}
                className="d-flex justify-content-center align-items-center"
              >
                <Card className="pokemon-card">
                  <div className="card-content">
                    <p>Click card to choose your battlemon</p>
                    <div className="image-container">
                      <a href="#" onClick={RunPutFunction}>
                        <Card.Img
                          variant="top"
                          src={p.img_url}
                          alt={p.name}
                          className="pokemon-image"
                        />
                      </a>
                    </div>
                    <Card.Body>
                      <Card.Title>{p.name}</Card.Title>
                      <Card.Text>Type: {p.type}</Card.Text>
                    </Card.Body>
                  </div>
                </Card>
              </Col>
            ))}
            <div className="d-flex justify-content-center align-items-center">
              <button
                onClick={RunPutFunction}
                className="choose-button d-flex justify-content-center align-items-center"
              >
                I Choose You
              </button>
            </div>
          </div>
          <PokeDex />
        </div>
      ) : (
        <h1>Login to see page!</h1>
      )}
    </>
  );
}
