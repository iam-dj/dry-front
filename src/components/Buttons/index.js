import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";
import btn4 from "./assets/btn4.png";
import btn5 from "./assets/btn5.png";
import btn6 from "./assets/btn6.png";
import btn7 from "./assets/btn7.png";
import btn9 from "./assets/btn9.png";

export default function Buttons() {
  return (
    <div className="buttons-container">
      <div className="button-row">
        <Link to="/catch">
          <img src={btn4} alt="Button 4" className="button" />
        </Link>
        <Link to="/battle">
          <img src={btn5} alt="Button 5" className="button" />
        </Link>
      </div>
      <div className="button-row">
        <Link to="/all">
          <img src={btn6} alt="Button 6" className="button" />
        </Link>
       
      </div>
      <div className="button-row">
       
        <Link to="/gym">
          <img src={btn7} alt="Button 7" className="button" />
        </Link>
        <Link to="/setpoke">
          <img src={btn9} alt="Button 9" className="button" />
        </Link>
      </div>
    </div>
  );
}
