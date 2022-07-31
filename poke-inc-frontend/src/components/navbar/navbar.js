import React from "react";
import "./navbar.css"
import "bootstrap/dist/css/bootstrap.min.css";


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
          <a class="nav-link color-me" href="/createDeck">Create Deck</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href={path}>My Decks</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href="/allDecks">All Decks</a>
        </li>
        <li class="nav-item">
          <a class="nav-link color-me" href="/createForum">Create Forum</a>
        </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link color-me" href="/">Logout</a>
          </li>
          <li class="nav-item mr-auto">
            <a className="" href="/profile"><img class="width1 rounded-circle" src={picture}/></a>
          </li>
        </ul>
  </nav>
  );
};

export default Navbar;