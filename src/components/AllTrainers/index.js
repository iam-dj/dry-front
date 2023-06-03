import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import bfg from "./assets/bg.png";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function AllTrainers(props) {
  const allTrainers = props.loadedTrainer;

  const handleBattle = (trainerId) => {
    // Handle battle logic here
    console.log("Battle with trainer:", trainerId);
  };

  const cardStyle = {
    backgroundImage: `url(${bfg})`,
    backgroundSize: "auto",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    width: "100%",
    height: "auto",
  };

  return (
    <div>
      <body style={cardStyle}>
        <Container>
          <Row className="justify-content-center">
            {props.isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              allTrainers.map((trainer) => (
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
      </body>
    </div>
  );
}
