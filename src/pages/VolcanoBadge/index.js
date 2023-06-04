import React from "react";
import "./style.css";
import blaine from "./assets/blaineVol.png";
import volcano from "./assets/volcano.jpg";

export default function VolcanoBadge() {
  const cardStyle = {
    backgroundImage: `url(${volcano})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={cardStyle}>
      <div className="row">
        <div className="col">
          <img src={blaine} alt="Image" />
        </div>
        <div className="col">
          <div className="card">
            <img src='' alt="Photo" className="card-img-top" />
            <div className="card-body">
              <button className="btn btn-primary">Battle</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src='' alt="Photo" className="card-img-top" />
            <div className="card-body">
              <button className="btn btn-primary">Battle</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src='' alt="Photo" className="card-img-top" />
            <div className="card-body">
              <button className="btn btn-primary">Battle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
