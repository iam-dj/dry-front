import React from "react";
import "./style.css";
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

export default function Badges() {
  return (
    <div>
      <Container className="">
        <Row className="justify-content-center cardtwo">
          <Col xs={1} className="p-1">
            <img className="imgFix" alt="boulder" src={one} />
          </Col>
          <Col xs={1} className="p-1">
            <img className="imgFix" alt="cascade" src={two} />
          </Col>
          <Col xs={1} className="p-1">
            <img className="imgFix" alt="thunder" src={three} />
          </Col>
          <Col xs={1} className="p-1">
            <img className="imgFix" alt="rainbow" src={four} />
          </Col>
          <Col xs={1} className="p-1">
            <img className="imgFix" alt="soul" src={five} />
          </Col>
          <Col xs={1} className="p-1">
            <img className="imgFix" alt="marsh" src={six} />
          </Col>
          <Col xs={1} className="p-1">
            <img className="imgFix" alt="volcano" src={seven} />
          </Col>
          <Col xs={1} className="p-1">
            <img className="imgFix" alt="earth" src={eight} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
