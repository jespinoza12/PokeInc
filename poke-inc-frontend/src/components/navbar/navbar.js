import React from "react";
import "./navbar.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Navbar = (setLoginUser, picture, userId) => {
  picture = localStorage.getItem("picture")
  const path = `/myDecks`

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark width border">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link color-me" href="/home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href="/collection">All Cards</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href="/allDecks">All Decks</a>
        </li>
        </ul>
        <ul class="navbar-nav center">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="">
            <img class="width1 rounded-circle" src={picture}/>
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Dropdown.Item href="/createForum">
              Create Forum
            </Dropdown.Item>
            <Dropdown.Item href="/createDeck">
              Create Deck
            </Dropdown.Item>
            <Dropdown.Item href={path}>
              My Decks
            </Dropdown.Item>
            <Dropdown.Item href="/myForums">
              My Forums
            </Dropdown.Item>
            <NavDropdown.Divider varient="secondary" />
            <Dropdown.Item href="/profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Item href="/">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
        </ul>
  </nav>
  );
};

export default Navbar;