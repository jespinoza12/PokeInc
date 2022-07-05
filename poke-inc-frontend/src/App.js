import './App.css'
import React from 'react';
import Homepage from "./components/homepage/homepage"
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login"
import Register from "./components/register/register"
import Collection from "./components/collection/collection"
import Profile from "./components/profile/profile"
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";




function App() {

  const [ user, setLoginUser] = useState({})

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Homepage setLoginUser={setLoginUser}/>
              : <Login setLoginUser={setLoginUser}/>
            }
          </Route>
          <Route exact path="/login">
            <Login setLoginUser={setLoginUser}/>
          </Route>
          <Route exact path="/register">
            <Register  />
          </Route>
          <Route exact path="/home">
            {
              <Homepage setLoginUser={setLoginUser}/>
            }
          </Route>
          <Route exact path="/collection">
            {
              <Collection setLoginUser={setLoginUser}/>  
            }
          </Route>
          <Route exact path="/profile">
            {
              <Profile setLoginUser={setLoginUser}/>       
            }
          </Route> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
