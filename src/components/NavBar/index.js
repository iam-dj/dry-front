import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs() {
  return (
    <nav className="Navbar">
        <Link className="nav-link text-dark" to="/">
          Home
        </Link>
        <Link className="nav-link text-dark" to="/About">
          About Me
        </Link>
        <Link className="nav-link text-dark" to="/Portfolio">
          Portfolio
        </Link>
        <Link className="nav-link text-dark" to="/Resume">
          Resume
        </Link>
        <Link className="nav-link text-dark" to="/Contact">
          Contact
        </Link>
    </nav>
  )
}

export default NavTabs;
