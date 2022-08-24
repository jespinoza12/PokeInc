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

  function onClickLogout(e){  
    e.preventDefault();
    history.push(process.env.PUBLIC_URL + "/")
    window.location.reload()
  }

  function onClickHome(e){  
    e.preventDefault();
    history.push(process.env.PUBLIC_URL + "/home")
    window.location.reload()
  }
  function onClickAllDecks(e){  
    e.preventDefault();
    history.push(process.env.PUBLIC_URL + "/allDecks")
    window.location.reload()
  }
  function onClickAllForums(e){  
    e.preventDefault();
    history.push(process.env.PUBLIC_URL + "/allForums")
    window.location.reload()
  }
  function onClickCreateDeck(e){  
    e.preventDefault();
    history.push(process.env.PUBLIC_URL + "/createDeck")
    window.location.reload()
  }
  function onClickAllUsers(e){  
    e.preventDefault();
    history.push(process.env.PUBLIC_URL + "/allUsers")
    window.location.reload()
  }
  function onClickMyPage(e){  
    e.preventDefault();
    history.push(process.env.PUBLIC_URL + "/myPage")
    window.location.reload()
  }
  function onClickMyDecks(e){  
    e.preventDefault();
    history.push(process.env.PUBLIC_URL + "/myDecks")
    window.location.reload()
  }
  function onClickMyForums(e){  
    e.preventDefault();
    history.push(process.env.PUBLIC_URL + "/myForums")
    window.location.reload()
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark width border sticky-nav">
      <ul class="navbar-nav me-auto btn-group m-3">
          <button class="nav-link color-me btn-secondary btn" onClick={onClickHome}>Home</button>
          <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/collection")}>All Cards</button>
          <button class="btn btn-secondary btn" onClick={onClickAllDecks}>All Decks</button>
          <button class="btn btn-secondary btn" onClick={onClickAllForums}>All Forums</button>       
          <button class="btn btn-secondary btn" onClick={onClickAllUsers}>Users</button>
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
              <button class="btn btn-secondary btn" onClick={onClickCreateDeck}>Create Deck</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={onClickMyDecks}>My Decks</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={onClickMyForums}>My Forums</button>
            </Dropdown.Item>
            <NavDropdown.Divider varient="secondary" />
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={onClickMyPage}>My Profile Page</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={()=>history.push(process.env.PUBLIC_URL + "/profile")}>Profile Settings</button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button class="btn btn-secondary btn" onClick={onClickLogout}>Logout</button>
            </Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
        </ul>
  </nav>
  );
};

export default Navbar;