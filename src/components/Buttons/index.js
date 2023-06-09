import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import btn5 from "./assets/btn5.png";
import btn4 from "./assets/btn4.png";
import btn6 from "./assets/btn6.png";
import btn7 from "./assets/btn7.png";
import btn8 from "./assets/btn8.png";
import btn9 from "./assets/btn10.png";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Buttons() {
  return (
    <>
      <Row noGutters>
        <Col className="remove-it"  xs={12} sm={6}>
          <Link to="/">
            <img
              style={{ marginTop: 10 + "px",marginLeft: 10 + "px" }}
              src={btn4}
              alt="Button 4"
              className="button"
            />
          </Link>
        </Col>
        <Col className="remove-it" xs={12} sm={6}>
          <Link to="/catch">
            <img
              style={{ marginTop: 10 + "px",marginLeft: 5 + "px" }}
              src={btn5}
              alt="Button 5"
              className="button"
            />
          </Link>
        </Col>
        <Col className="remove-it" xs={12} sm={6}>
          <Link to="/train">
            <img
              style={{ marginTop: 10 + "px",marginLeft: 10 + "px" }}
              src={btn6}
              alt="Button 6"
              className="button"
            />
          </Link>
        </Col>
        <Col className="remove-it" xs={12} sm={6}>
          <Link to="/boulder-badge">
            <img
              style={{ marginTop: 10 + "px",marginLeft: 5 + "px" }}
              src={btn7}
              alt="Button 7"
              className="button"
            />
          </Link>
        </Col>
        <Col className="remove-it" xs={12} sm={6}>
          <Link to="/setpoke">
            <img
              style={{ marginTop: 10 + "px",marginLeft: 10 + "px",marginBottom: 10 + "px" }}
              src={btn8}
              alt="Button 8"
              className="button"
            />
          </Link>
        </Col>
        <Col className="remove-it" xs={12} sm={6}>
          <Link to="/setmove">
            <img
              style={{ marginTop: 10 + "px",marginLeft: 5 + "px" }}
              src={btn9}
              alt="Button 9"
              className="button"
            />
          </Link>
        </Col>
      </Row>
    </>
  );
}
