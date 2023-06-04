import React, { useState } from "react";
import "./style.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function PokeDex(props) {
  const pokemon = props.trainer.pokemons;
  const [activeType, setActiveType] = useState(pokemon[0].type);
  const [showCaughtPokemon, setShowCaughtPokemon] = useState(false);
  const [showMainPokemon, setShowMainPokemon] = useState(false);

  // Get unique list of Pokemon types
  const pokemonTypes = [...new Set(pokemon.map((p) => p.type))];

  // Filter Pokemon by selected type
  const filteredPokemon = pokemon.filter((p) => p.type === activeType);

  // Filter caught and uncaught Pokemon if the button is toggled
  const caughtPokemon = showCaughtPokemon
    ? pokemon.filter((p) => p.isCaught)
    : filteredPokemon;

  // Filter main Pokemon if the button is toggled
  const mainPokemon = showMainPokemon
    ? caughtPokemon.filter((p) => p.isMain)
    : caughtPokemon;

  const caughtButtonVariant = showCaughtPokemon ? "success" : "danger";
  const caughtButtonLabel = showCaughtPokemon ? "Showing Caught" : "Showing Uncaught";

  const mainButtonVariant = showMainPokemon ? "info" : "secondary";
  const mainButtonLabel = showMainPokemon ? "Showing Main filter on" : "Showing Main off";

  return (
    <div>
      <Container className="space-tab">
        <Tab.Container defaultActiveKey="all-pokemon">
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
              variant={caughtButtonVariant}
              onClick={() => setShowCaughtPokemon(!showCaughtPokemon)}
              className="btn btn-sm ml-2"
            >
              {caughtButtonLabel}
            </Button>
            <Button
              variant={mainButtonVariant}
              onClick={() => setShowMainPokemon(!showMainPokemon)}
              className="btn btn-sm ml-2"
            >
              {mainButtonLabel}
            </Button>
          </div>

          <Tab.Content>
            <Tab.Pane eventKey="all-pokemon">
              <Row xs={1} sm={2} md={3} lg={4} xl={5} className="pokemon-row">
                {mainPokemon.map((p) => (
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
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
              {mainPokemon.length === 0 && (
                <p className="text-center mt-3">No main Pokemon found.</p>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
}
