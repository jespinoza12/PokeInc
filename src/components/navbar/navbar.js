import React from "react";
import "./navbar.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Homepage from "../homepage/homepage";


const Navbar = (setLoginUser, picture, userId) => {
  picture = localStorage.getItem("picture")
  let history = useHistory()

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark width border sticky-nav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link color-me" onClick={()=>history.push(process.env.PUBLIC_URL + "/home")}>Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href={process.env.PUBLIC_URL + "/collection"}>All Cards</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href={process.env.PUBLIC_URL + "/allDecks"}>All Decks</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href={process.env.PUBLIC_URL + "/allForums"}>All Forums</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href={process.env.PUBLIC_URL + "/allUsers"}>Users</a>
        </li>
        </ul>
        <ul class="navbar-nav center">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="">
            <img class="width1 rounded-circle" src={picture} alt=""/>
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
          <Dropdown.Item href={process.env.PUBLIC_URL +"/createPost"}>
              Post
            </Dropdown.Item>
            <Dropdown.Item href={process.env.PUBLIC_URL + "/createForum"}>
              Create Forum
            </Dropdown.Item>
            <Dropdown.Item href={process.env.PUBLIC_URL +"/createDeck"}>
              Create Deck
            </Dropdown.Item>
            <Dropdown.Item href={process.env.PUBLIC_URL + "/myDecks"}>
              My Decks
            </Dropdown.Item>
            <Dropdown.Item href={process.env.PUBLIC_URL + "/myForums"}>
              My Forums
            </Dropdown.Item>
            <NavDropdown.Divider varient="secondary" />
            <Dropdown.Item href={process.env.PUBLIC_URL + "/myPage"}>
              My Profile Page
            </Dropdown.Item>
            <Dropdown.Item href={process.env.PUBLIC_URL + "/profile"}>
              Profile Settings
            </Dropdown.Item>
            <Dropdown.Item href={process.env.PUBLIC_URL + "/"}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
        </ul>
  </nav>
  );
};

export default Navbar;