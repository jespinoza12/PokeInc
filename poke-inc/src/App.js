import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login"
import Signup from "./pages/signup"



function App() {

  
  //For Api Data
  let Component
  switch (window.location.pathname) {
    case "/login" :
      Component = <Login />
      break
    case "/" :
      Component = <Signup />
      break
  }

  return (
    <div>
      <div>
      {Component}
      </div>
      <footer class="page-footer font-small blue">
        <div class="footer-copyright text-center py-3">© 2022 Copyright: Julian Espinoza</div>
      </footer>
    </div>
  );  
}

export default App;
