import React from "react";
import "./style.css";
import janine from "./assets/janine_soul.png";
import soul from "./assets/soul.jpg";

export default function SoulBadge() {
  const cardStyle = {
    backgroundImage: `url(${soul})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const imgStyle = {
    
    width: "166%",
  };
  return (
    <div style={cardStyle}>
      <div className="row">
        <div className="col">
          <img style={imgStyle} src={janine} alt="Image" />
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
