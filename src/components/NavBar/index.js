import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import ditto from "./assets/ditto.png";

function NavTabs(props) {
  const dropdownMenuStyles = {
    backgroundColor: "whitesmoke",
  };

  const dropdownSubmenuStyles = {
    backgroundColor: "whitesmoke",
  };

  return (
    <Navbar style={dropdownMenuStyles} bg="" expand="lg">
      <Navbar.Toggle style={dropdownMenuStyles} aria-controls="navbar-nav" />
      <Navbar.Collapse style={dropdownMenuStyles} id="navbar-nav">
        <Nav style={dropdownMenuStyles} className="">
          {props.userId ? (
            <>
              <Dropdown style={dropdownMenuStyles} as={Nav.Item}>
                <Dropdown.Toggle
                  style={dropdownMenuStyles}
                  as={Nav.Link}
                  variant="link"
                >
                  Pokemon Journey
                </Dropdown.Toggle>
                <Dropdown.Menu style={dropdownMenuStyles}>
                  <Dropdown.Item style={dropdownMenuStyles} as={Link} to="/">
                    Home Page
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={dropdownMenuStyles}
                    as={Link}
                    to="/train"
                  >
                    Train Your Pokemon
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={dropdownMenuStyles}
                    as={Link}
                    to="/catch"
                  >
                    Catch 'em All
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={dropdownMenuStyles}
                    as={Link}
                    to="/dashboard"
                  >
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={dropdownMenuStyles}
                    as={Link}
                    to="/setpoke"
                  >
                    Set Your Pokemon
                  </Dropdown.Item>
                  <Dropdown style={dropdownMenuStyles} as={Nav.Item}>
                    <Dropdown.Toggle
                      style={dropdownMenuStyles}
                      as={Nav.Link}
                      variant="link"
                    >
                      Gym Battle
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={dropdownSubmenuStyles}>
                      <Dropdown.Item
                        style={dropdownMenuStyles}
                        as={Link}
                        to="/boulder-badge"
                      >
                        Boulder Badge
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={dropdownMenuStyles}
                        as={Link}
                        to="/cascade-badge"
                      >
                        Cascade Badge
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={dropdownMenuStyles}
                        as={Link}
                        to="/thunder-badge"
                      >
                        Thunder Badge
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={dropdownMenuStyles}
                        as={Link}
                        to="/rainbow-badge"
                      >
                        Rainbow Badge
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={dropdownMenuStyles}
                        as={Link}
                        to="/soul-badge"
                      >
                        Soul Badge
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={dropdownMenuStyles}
                        as={Link}
                        to="/marsh-badge"
                      >
                        Marsh Badge
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={dropdownMenuStyles}
                        as={Link}
                        to="/volcano-badge"
                      >
                        Volcano Badge
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={dropdownMenuStyles}
                        as={Link}
                        to="/earth-badge"
                      >
                        Earth Badge
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Dropdown.Menu>
              </Dropdown>

              <button className="my-btn btn" style={{ marginRight: 10 + "px",marginLeft: 10 + "px",paddingBottom: 0 + "px"  }} onClick={props.logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                style={{ marginRight: 10 + "px",marginLeft: 10 + "px"  }}
                className="btn btn-primary "
                to="/signup"
              >
                Sign Up
              </Link>
              <Link className="btn btn-primary " to="/login">
                Login
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavTabs;
