import React from "react";
import "./style.css";
import brock from "./assets/DP-Brock.png";
import boulder from "./assets/boulder.png";

export default function BoulderBadge() {
  const cardStyle = {
    backgroundImage: `url(${boulder})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const imgStyle = {
    
    width: "220%",
    paddingRight: "20px"
  };
  return (
    <div style={cardStyle}>
      <div className="row">
        <div className="col">
          <img style={imgStyle} src={brock} alt="Image" />
        </div>
        <div className="col">
          <div className="card">
            {/* <img src={photoSrc} alt="Photo" className="card-img-top" /> */}
            <div className="card-body">
              <button className="btn btn-primary">Battle</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            {/* <img src={photoSrc} alt="Photo" className="card-img-top" /> */}
            <div className="card-body">
              <button className="btn btn-primary">Battle</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            {/* <img src={photoSrc} alt="Photo" className="card-img-top" /> */}
            <div className="card-body">
              <button className="btn btn-primary">Battle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
