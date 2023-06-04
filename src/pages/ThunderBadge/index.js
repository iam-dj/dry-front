import React from "react";
import "./style.css";
import surge from "./assets/Lt._Surge.png";
import thunder from "./assets/thunder.jpg";

export default function ThunderBadge() {
  const cardStyle = {
    backgroundImage: `url(${thunder})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imgStyle = {
    
    width: "110%",
  };
  return (
    <div style={cardStyle}>
      <div className="row">
        <div className="col">
          <img style={imgStyle} src={surge} alt="Image" />
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
            <img src= '' alt="Photo" className="card-img-top" />
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
