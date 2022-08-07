import React from "react"
import "./homepage.css"
import Navbar from "../navbar/navbar";
const Homepage = ({picture, forums, rawr}) => {

    return (
        <div className="pokeFont">
            <h1 className="center">Welcome to PokeInc</h1>
            <Navbar picture = {picture}/>
            
        </div>
        
    )
}

export default Homepage