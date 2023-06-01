import React from "react";
import { Link } from "react-router-dom";
import "./style.css";


// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs(props) {
  return (
    <nav className="Navbar">
      <Link className="nav-link text-dark" to="/">
        Home
      </Link>
      <Link className="nav-link text-dark" to="/battle">
        Battle
      </Link>
    
     {props.userId ? (
        <button className="nav-link text-dark" onClick={props.logout}>
          Logout
        </button>
      ) : (
        <Link className="nav-link text-dark" to="/login">
          Login
        </Link>
      )}
    
      {/* <Link className="nav-link text-dark" to="/Resume">
          Resume
        </Link>
        <Link className="nav-link text-dark" to="/Contact">
          Contact
        </Link> */}
    </nav>
  );
}

export default NavTabs;
