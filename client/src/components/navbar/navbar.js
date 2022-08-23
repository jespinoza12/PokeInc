import React from "react";
import "./navbar.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from "react-router-dom"
import NavDropdown from 'react-bootstrap/NavDropdown';
import Homepage from "../homepage/homepage";


const Navbar = (setLoginUser, picture, userId) => {
  picture = localStorage.getItem("picture")
  let history = useHistory()

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark width border sticky-nav">
      <ul class="navbar-nav me-auto btn-group m-3">
          <button class="nav-link color-me btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/home")}>Home</button>
          <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/collection")}>All Cards</button>
          <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/allDecks")}>All Deck</button>
          <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/allForums")}>All Cards</button>       
          <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/allUsers")}>Users</button>
        </ul>
        <ul class="navbar-nav center">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="">
            <img class="width1 rounded-circle" src={picture} alt=""/>
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/createPost")}>Create Post</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/createForum")}>Create Forum</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/createDeck")}>Create Deck</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/myDecks")}>My Decks</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/myForums")}>My Forums</button>
            </Dropdown.Item>
            <NavDropdown.Divider varient="secondary" />
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/myPage")}>My Profile Page</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/profile")}>Profile Settings</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/")}>Logout</button>
            </Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
        </ul>
  </nav>
  );
};

export default Navbar;