import React from "react";
import "./navbar.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Homepage from "../homepage/homepage";


const Navbar = (setLoginUser, picture, userId) => {
  picture = localStorage.getItem("picture")
  const path = `/myDecks`

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark width border sticky-nav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link color-me" href="/PokeInc/home"  >Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href="/PokeInc/collection">All Cards</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href="/PokeInc/allDecks">All Decks</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href="/PokeInc/allForums">All Forums</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href="/PokeInc/allUsers">Users</a>
        </li>
        </ul>
        <ul class="navbar-nav center">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="">
            <img class="width1 rounded-circle" src={picture} alt=""/>
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
          <Dropdown.Item href="/PokeInc/createPost">
              Post
            </Dropdown.Item>
            <Dropdown.Item href="/PokeInc/createForum">
              Create Forum
            </Dropdown.Item>
            <Dropdown.Item href="/PokeInc/createDeck">
              Create Deck
            </Dropdown.Item>
            <Dropdown.Item href={path}>
              My Decks
            </Dropdown.Item>
            <Dropdown.Item href="/PokeInc/myForums">
              My Forums
            </Dropdown.Item>
            <NavDropdown.Divider varient="secondary" />
            <Dropdown.Item href="/PokeInc/myPage">
              My Profile Page
            </Dropdown.Item>
            <Dropdown.Item href="/PokeInc/profile">
              Profile Settings
            </Dropdown.Item>
            <Dropdown.Item href="/PokeInc/">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
        </ul>
  </nav>
  );
};

export default Navbar;