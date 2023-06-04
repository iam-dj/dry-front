import React from "react";
import "./style.css";
import sabrina from "./assets/Sabrina_Marsh.png";
import marsh from "./assets/marsh.png";

export default function MarshBadge() {
  const cardStyle = {
    backgroundImage: `url(${marsh})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const imgStyle = {
    
    width: "100%",
  };
  
  return (
    <div style={cardStyle}>
      <div className="row">
        <div className="col">
          <img style={imgStyle} src={sabrina} alt="Image" />
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
