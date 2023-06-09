import React, { useState } from "react";
import "./style.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";

export default function PokeDex(props) {
  const pokemon = props.trainer.pokemons;
  const [activeType, setActiveType] = useState(pokemon[0].type);
  const [showCaughtPokemon, setShowCaughtPokemon] = useState(false);
  const [showMainPokemon, setShowMainPokemon] = useState(false);
  const [activePokemonMoves, setActivePokemonMoves] = useState([]);
  const [thefilteredPokemon, settheFilteredPokemon] = useState([]);

  // Get unique list of Pokemon types
  const pokemonTypes = [...new Set(pokemon.map((p) => p.type))];

  const handlePokemonClick = (moves) => {
    setActivePokemonMoves(moves);
  };

  // Filter Pokemon by selected type
  const filteredPokemon = pokemon.filter(
    (p) => p.type.toLowerCase() === activeType.toLowerCase()

    );
    console.log("filteredPokemon", filteredPokemon)

  const filteredCaughtPokemon = pokemon.filter((p) => p.isCaught === true );
  console.log("filteredCaughtPokemon", filteredCaughtPokemon)

  const allPokemon = pokemon; 
  console.log("allPokemon", allPokemon)


  // Filter caught and uncaught Pokemon if the button is toggled
  const caughtPokemon = showCaughtPokemon
    ? pokemon.filter((p) => p.isCaught)
    : filteredPokemon;

  // Filter main Pokemon if the button is toggled
  const mainPokemon = showMainPokemon
    ? caughtPokemon.filter((p) => p.isMain)
    : caughtPokemon;

  const caughtButtonVariant = showCaughtPokemon ? "success" : "danger";
  const caughtButtonLabel = showCaughtPokemon
    ? "Showing Caught"
    : "Showing Uncaught";

  const mainButtonVariant = showMainPokemon ? "info" : "secondary";
  const mainButtonLabel = showMainPokemon
    ? "Showing Main filter on"
    : "Showing Main off";

  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    fairy: "#FFDBEF",
  };

  return (
    <div style={{ paddingBottom: "75px" }}>
      <Container className="space-tab">
        <Tab.Container defaultActiveKey="all-pokemon">
          <div className="button-row d-flex justify-content-center">
            {pokemonTypes.map((type) => (
              <Button
                key={type}
                variant={type === activeType ? "primary" : "dark"}
                onClick={() => {
                  setActiveType(type);
                  setShowCaughtPokemon(false); 
                }}
                className="btn btn-sm"
                style={{
                  backgroundColor: typeColors[type.toLowerCase()] || "gray",
                  color: "white",
                  marginRight: "5px",
                }}
              >
                {type}
              </Button>
            ))}

            <Button
              variant={caughtButtonVariant}
              onClick={() => {
                if (showCaughtPokemon) {
                  // Filter by uncaught Pokemon
                  const filtered = pokemon.filter(
                    (p) => p.type === activeType && !p.isCaught
                  );
                  settheFilteredPokemon(filtered);
                } else {
                  // Filter by caught Pokemon
                  const filtered = pokemon.filter(
                    (p) => p.type === activeType && p.isCaught
                  );
                  settheFilteredPokemon(filtered);
                }
                setShowCaughtPokemon(!showCaughtPokemon);
              }}
              className="btn btn-sm ml-2"
            >
              {caughtButtonLabel}
            </Button>

            {/* <Button
              variant={mainButtonVariant}
              onClick={() => setShowMainPokemon(!showMainPokemon)}
              className="btn btn-sm ml-2"
            >
              {mainButtonLabel}
            </Button> */}
          </div>

          <Tab.Content>
            <Tab.Pane eventKey="all-pokemon">
              <Row xs={1} sm={2} md={3} lg={4} xl={5} className="pokemon-row">
                {mainPokemon.length === 0 ? (
                  <p className="text-center mt-3">No main Pokemon found.</p>
                ) : (
                  mainPokemon.map((p) => (
                    <Col key={p.id} className="mb-3">
                      <Card
                        style={{ border: "15px solid gold" }}
                        className="pokemon-card"
                      >
                        <div className="card-content">
                          <Card.Img
                            variant="top"
                            src={p.img_url}
                            alt={p.name}
                            className="pokemon-image"
                          />
                          <Card.Body>
                            <p
                              className="font-text"
                              style={{ fontSize: "medium" }}
                            >
                              {p.name}
                            </p>
                            <Card.Text>Type: {p.type}</Card.Text>
                          </Card.Body>
                        </div>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
}
