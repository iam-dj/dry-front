import React from "react";
import "./style.css";
import gio from "./assets/giovanniEarth.png";
import earth from "./assets/earth.png";

export default function EarthBadge() {
  const cardStyle = {
    backgroundImage: `url(${earth})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const imgStyle = {
    
    width: "95%",
  };
  return (
    <div style={cardStyle}>
      <div className="row">
        <div className="col">
          <img style={imgStyle} src={gio} alt="Image" />
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
