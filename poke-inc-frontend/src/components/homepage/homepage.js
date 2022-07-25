import React from "react"
import "./homepage.css"
import Navbar from "../navbar/navbar";
const Homepage = ({setLoginUser, picture}) => {

    return (
        <div className="homepage pokeFont">
            <h1>Hello Welcome to my Home page</h1>
            <Navbar picture = {picture}/>  
        </div>
        
    )
}

export default Homepage