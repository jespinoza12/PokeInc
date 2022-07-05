import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css"
const Navbar = (setLoginUser) => {


  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark width">
  <a class="navbar-brand" href="/home">PokeInc</a>
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
        <a class="nav-link color-me" href="/">Logout</a>
      </li>
    </ul>
  </div>
</nav>
  );
};

export default Navbar;