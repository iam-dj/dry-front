import React, { useState } from "react";
import "./style.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// import ash from "./ash.json";

export default function PokeDex(props) {
  const pokemon = props.trainer.pokemons;
  const [activeType, setActiveType] = useState(pokemon[0].type);
  const [showCaughtPokemon, setShowCaughtPokemon] = useState(false);

  // Get unique list of Pokemon types
  const pokemonTypes = [...new Set(pokemon.map((p) => p.type))];

  // Filter Pokemon by selected type
  const filteredPokemon = pokemon.filter((p) => p.type === activeType);

  // Filter caught and uncaught Pokemon if the button is toggled
  const caughtPokemon = showCaughtPokemon
    ? filteredPokemon.filter((p) => p.isCaught)
    : filteredPokemon;

  const caughtButtonLabel = showCaughtPokemon
    ? "Showing Caught"
    : "Showing Uncaught";

  return (
    <div>
      <Container className="space-tab">
        <div className="button-row d-flex justify-content-center">
          {pokemonTypes.map((type) => (
            <Button
              key={type}
              variant={type === activeType ? "primary" : "dark"}
              onClick={() => setActiveType(type)}
              className="btn btn-sm"
            >
              {type}
            </Button>
          ))}
          <Button
            variant={showCaughtPokemon ? "success" : "danger"}
            onClick={() => setShowCaughtPokemon(!showCaughtPokemon)}
            className="btn btn-sm ml-2"
          >
            {caughtButtonLabel}
          </Button>
        </div>

        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="pokemon-row">
          {caughtPokemon.map((p) => (
            <Col key={p.id} className="mb-3">
              <Card className="pokemon-card">
                <div className="card-content">
                  <Card.Img
                    variant="top"
                    src={p.img_url}
                    alt={p.name}
                    className="pokemon-image"
                  />

                  <Card.Body>
                    <Card.Title>{p.name}</Card.Title>
                    <Card.Text>Type: {p.type}</Card.Text>
                    <Card.Text>
                      Move 1: {p.move1.name} - {p.move1.description}
                    </Card.Text>
                    {/* <Card.Text>Type: {p.move2}</Card.Text> */}
                    {/* <Card.Text>Type: {p.move3}</Card.Text> */}
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))}
          {caughtPokemon.length === 0 && !showCaughtPokemon && (
            <p className="text-center mt-3">No Pokémon found.</p>
          )}
        </Row>
      </Container>
    </div>
  );
}
