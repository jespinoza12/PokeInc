import React, { useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css"
const Navbar = (setLoginUser, user) => {


  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark width border">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link color-me" href="/home">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link color-me" href="/collection">All Cards</a>
      </li>
      <li class="nav-item">
        <a class="nav-link color-me" href="/profile">Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link color-me" href="/createDeck">Create Deck</a>
      </li>
      <li class="nav-item">
        <a class="nav-link color-me" href="/">Logout</a>
      </li>
      <li class="nav-item">
        <a class="nav-link color-me" href="/profile"></a>
      </li>
    </ul>
  </div>
</nav>
  );
};

export default Navbar;