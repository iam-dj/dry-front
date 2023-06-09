import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

const GymInstructions = () => {
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
        }}
        show={showToast}
        onClose={() => setShowToast(false)}
      >
        <Toast.Header>
          <strong className="mr-auto">Instructions</strong>
        </Toast.Header>
        <Toast.Body>
          <div>
            Each gym leader has three Pokémon each getting harder after the
            first. Click each challenge and test your might against gym leader
            Pokémon types.
            <br />
            <br />
            <strong>Each individual</strong> pokemon progresses through the gym
            and records a victory in the gym upon beating the gym leader's 3rd
            pokemon{" "}
            <strong>
              (as well as the trainer also being awarded the badge)
            </strong>
            .
            <br />
            <br />
            <strong>For example</strong>: if you bring a pikachu to Brocks gym,
            and beat his first pokemon, then switch your main pokemon to
            Blastoise, you will have to defeat Brock's first pokemon again. (it
            will keep track of the stage each pokemon is on, so if you were to
            return to pikachu, you wont have to defeat the first pokemon again){" "}
            <br />
            <br />
            <strong>
              Each time a respective pokemon defeats a Gym leader, it resets
              your stage back to stage 1, and that gym leader becomes more
              difficult for that pokemon to defeat again.
            </strong>{" "}
            <br />
            <br />
            Good luck!
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default GymInstructions;
