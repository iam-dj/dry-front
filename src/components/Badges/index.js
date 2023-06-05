import React from "react";
import "./style.css";
import one from "./assets/one.png";
import two from "./assets/two.png";
import three from "./assets/three.png";
import four from "./assets/four.png";
import five from "./assets/five.png";
import six from "./assets/six.png";
import seven from "./assets/seven.png";
import eight from "./assets/eight.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ash from "./ash.json";

// useEffect(() => {
//   API.getOneTrainer(props.trainerId)
//     .then((data) => {
//       console.log("data", data);
//       setTrainer(data);
//       setIsLoading(false);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, []);

export default function Badges(props) {
  const badges = [
    { name: "boulder", image: one, badge: props.trainer.boulder_badge },
    { name: "cascade", image: two, badge: props.trainer.cascade_badge },
    { name: "thunder", image: three, badge: props.trainer.thunder_badge },
    { name: "rainbow", image: four, badge: props.trainer.rainbow_badge },
    { name: "soul", image: five, badge: props.trainer.soul_badge },
    { name: "marsh", image: six, badge: props.trainer.marsh_badge },
    { name: "volcano", image: seven, badge: props.trainer.volcano_badge },
    { name: "earth", image: eight, badge: props.trainer.earth_badge },
  ];

  return (
    <div className="d-flex flex-grow-0">
        {badges.map((badge, index) => (
            <img
              xs={0}
              className={`imgFix ${!badge.badge && "badge-disabled"}`}
              key={index}
              alt={badge.name}
              src={badge.image}
              style={{
                // marginRight: "10px",
                // marginLeft: "10px",
                paddingBottom: "0px",
              }}
            />
        ))}
    </div>
  );
}
