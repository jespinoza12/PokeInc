import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar"

function home() {

  
  //For Api Data

  let Component
  switch (window.location.pathname) {
    case "/" :
      Component = <Home />
      break
  }

  return (
    <div className="App">
      <div>
      <Navbar />
      </div>
      {Component}

      <footer>
      <p>Copyright 2022 Julian Espinoza, Bungie</p>
      </footer>
    </div>
  );  
}

export default home;
