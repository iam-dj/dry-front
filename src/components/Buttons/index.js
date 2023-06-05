import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import btn4 from "./assets/btn4.png";
import btn5 from "./assets/btn5.png";
import btn6 from "./assets/btn6.png";
import btn7 from "./assets/btn7.png";
import btn8 from "./assets/btn8.png";
import btn9 from "./assets/btn9.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Buttons() {
  return (
    <>
      <div className="row">
        <div className="col-6 d-flex justify-content-start">
          <Link to="/catch">
            <img src={btn4} alt="Button 4" className="button" />
          </Link>
        </div>
        <div className="col-6 ">
          <Link to="/train">
            <img src={btn5} alt="Button 5" className="button d-flex align-item-end" />
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Link to="/all">
            <img src={btn6} alt="Button 6" className="button" />
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="/gym">
            <img src={btn7} alt="Button 7" className="button" />
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Link to="/gym">
            <img src={btn8} alt="Button 8" className="button" />
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="/setpoke">
            <img src={btn9} alt="Button 9" className="button" />
          </Link>
        </div>
      </div>
    </>
  );
}
