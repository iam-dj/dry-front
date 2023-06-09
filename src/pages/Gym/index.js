import React, { useState, useEffect } from "react";
import "./style.css";
import battlebg from "./assets/battle.jpg";
import BattleSys from "../../utils/BattleSys";
import { useNavigate } from "react-router-dom";
import one from "./assets/one.png";
import two from "./assets/two.png";
import three from "./assets/three.png";
import four from "./assets/four.png";
import five from "./assets/five.png";
import six from "./assets/six.png";
import seven from "./assets/seven.png";
import eight from "./assets/eight.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Gym(props) {
  
  useEffect(() => {
    if (!props.trainerId) {
      window.location.assign("/login");
    }
  }, [props.trainerId]);

  const navigate = useNavigate();

  useEffect(() => {
    if (props.token === null) {
      navigate("/login");
    }
  }, [props.token]);

  const cardStyle = {
    backgroundImage: `url(${battlebg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s",
  };

  const linkStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    overflow: "hidden",
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
  };

  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const images = [one, two, three, four, five, six, seven, eight];

  const handleImageHover = (index) => {
    setHoveredIndex(index);
  };

  const handleImageLeave = () => {
    setHoveredIndex(-1);
  };

  const handleImageClick = (index) => {
    console.log("Clicked image index:", index);
  };

  return (
    <div style={cardStyle}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <div style={gridContainerStyle}>
              {images.map((image, index) => (
                <div
                  key={index}
                  onMouseEnter={() => handleImageHover(index)}
                  onMouseLeave={handleImageLeave}
                  onClick={() => handleImageClick(index)}
                  style={{
                    ...linkStyle,
                    transform:
                      hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <a href="#">
                    <img src={image} alt={`Image ${index}`} style={imageStyle} />
                  </a>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
