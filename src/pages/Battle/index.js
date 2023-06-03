import React, { useState , useEffect} from "react";
import "./style.css";
import battlebg from "./assets/battle.jpg";
// import { fetchNPCData, simulateBattle } from "./pokemon_db"; // Example functions for fetching NPC data and simulating battle
import BattleSys from "../../utils/BattleSys"; // Example functions for fetching NPC data and simulating battle
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";


export default function Battle(props) {
  const navigate = useNavigate();

  // console.log(props.token)
  useEffect(() => {
    if (props.token == null ) {
      navigate("/login");
    }
  }, [props.token]);
  

  const cardStyle = {
    backgroundImage: `url(${battlebg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [show, setShow] = useState(false);

  const startBattleWithNPC = async () => {
    try {
      // Fetch NPC data from the database
      // const npcData = await fetchNPCData(); // Replace with your implementation of fetching NPC data
      
      // Simulate battle between player and NPC
      BattleSys.startBattle(); // Replace with your implementation of simulating battle
      
      console.log(); // Do something with the battle result, e.g., display it to the user
    } catch (error) {
      console.error("Error starting battle:", error);
    }
  };

  return (
    <>
      {props.token ? (
    <div style={cardStyle}>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-battle">
          Battle Menu
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={startBattleWithNPC}>Battle NPC</Dropdown.Item>
          <Dropdown.Item>Friendly Battle</Dropdown.Item>
          <Dropdown.Item>Suprise Me</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    </div>
     ) : (
      <h1>Login to see page!</h1>
    )}
  </>
  );
}
