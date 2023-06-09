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
          When you hit the battle button, you and your opponent's moves will be
          selected at random on each turn of battle. Please note that each
          respective pokemon's type and the type of abilities it uses will
          effect how much damage it does.
          <br></br> Refer to the "set pokemon page" to view the srength and
          weakness chart.<br></br> - Once a pokemon is out of HP, it feints and
          the battle is over. <br></br>- You will gain more experience for a
          win, and once your pokemon levels up it will increase it's HP!
          <br></br>- upon each win, you there is a chance you may earn more
          "spins" to catch more pokemon and retrieve more TM's!
        </Toast.Body>
      </Toast>
    </div>
  );
};
export default TrainInstructions;
