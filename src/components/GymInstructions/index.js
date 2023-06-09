import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

const GymInstructions = () => {
  const [showToast, setShowToast] = useState(false);

  const handleToastClick = () => {
    setShowToast(true);
  };

  return (
    <div>
      <button style={{
          position: "absolute",
          top: 55,
          left: 0,
        }}
         onClick={handleToastClick}>Show Instructions</button>
      <Toast
        style={{
          position: "absolute",
          top: 100,
          left: 0,
        }}
        show={showToast}
        onClose={() => setShowToast(false)}
      >
        <Toast.Header>
          <strong className="mr-auto">Instructions</strong>
        </Toast.Header>
        <Toast.Body>
          Each gym leader has three Pokémon each getting harder after the first.
          Click each challenge and test your might against gym leader Pokémon
          types. Good luck.
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default GymInstructions;
