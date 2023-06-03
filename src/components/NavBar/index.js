import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs(props) {
  return (
    <nav className="Navbar">
    {props.userId ? (
      <>
        <Link className="nav-link text-dark" to="/">
          Home Page
        </Link>
        <Link className="nav-link text-dark" to="/battle">
          Battle
        </Link>
        <Link className="nav-link text-dark" to="/catch">
          Catch
        </Link>
        <Link className="nav-link text-dark" to="/dashboard">
          Dashboard
        </Link>
        <Link className="nav-link text-dark" to="/setpoke">
          Set Your Pokemon
        </Link>
        <Link className="nav-link text-dark" to="/gym">
          Gym Battle
        </Link>
        <button className="nav-link text-dark" onClick={props.logout}>
          Logout
        </button>
      </>
    ) : (
      <>
        <Link className="nav-link text-dark" to="/login"></Link>
        <Link className="nav-link text-dark" to="/login"></Link>
        <Link className="nav-link text-dark" to="/login"></Link>
        <Link className="nav-link text-dark" to="/login"></Link>
        <Link className="nav-link text-dark" to="/login"></Link>
        <Link className="nav-link text-dark" to="/login"></Link>
        <Link className="nav-link text-dark" to="/login"></Link>
        
        {props.userId ? null : (
          <Link className="nav-link text-dark" to="/signup">
            Sign Up
          </Link>
        )}
        <Link className="nav-link text-dark" to="/login">
          Login
        </Link>
      </>
    )}
  </nav>
  

  );
}

export default NavTabs;
