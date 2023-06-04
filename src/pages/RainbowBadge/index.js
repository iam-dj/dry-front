import React from "react";
import "./style.css";
import erika from "./assets/rainbow_Erika.png";
import rainbow from "./assets/rainbow.jpg";

export default function RainbowBadge() {
  const cardStyle = {
    backgroundImage: `url(${rainbow})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const imgStyle = {
    
    width: "135%",
  };
  return (
    <div style={cardStyle}>
      <div className="row">
        <div className="col">
          <img style={imgStyle} src={erika} alt="Image" />
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
