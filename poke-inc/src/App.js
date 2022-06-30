import './App.css';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar"
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"



function App() {
  //For Api Data
  const [cards, setCards] = useState([]);

  let Component
  switch (window.location.pathname) {
    case "/" :
      Component = <Home />
      break
    case "/Signup" :
      Component = <Signup />
      break
    case "/Login" :
      Component = <Login />
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

export default App;
