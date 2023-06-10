import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
const TrainInstructions = () => {
  const [showToast, setShowToast] = useState(false);
  const handleToastClick = () => {
    setShowToast(true);
  };
  return (
    <div>
      <button
        style={{
          position: "absolute",
          top: 55,
          left: 0,
        }}
        onClick={handleToastClick}
      >
        Show Instructions
      </button>
      <Toast
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          zIndex: 9999,
        }}
        show={showToast}
        onClose={() => setShowToast(false)}
      >
        <Toast.Header>
          <strong className="mr-auto">Instructions</strong>
        </Toast.Header>
        <Toast.Body>
          <div>
            When you hit the battle button, you and your opponent's moves will
            be selected at random on each turn of battle.{" "}
            <strong>Please note:</strong> that each respective pokemon's type{" "}
            <strong>and</strong> the type of abilities used against it will
            affect how much damage it does, so choose your pokemon and their
            abilities wisely!
            <br />
            <br />
            Refer to the "set pokemon" page to view the strength and weakness
            chart.
            <br />
            <br />- Once a pokemon is out of HP, it faints and the battle is
            over. <br />
            - You will gain more experience for a win, and once your pokemon
            levels up it will increase its HP!
            <br />- Upon each win, there is a chance you may earn more "spins"
            to catch more pokemon and/or retrieve more TM's!
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
};
export default TrainInstructions;
