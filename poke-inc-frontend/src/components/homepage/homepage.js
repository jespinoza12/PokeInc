import React from "react"
import "./homepage.css"
import Navbar from "../navbar/navbar";
import Forums from '../viewForum/Forums';
const Homepage = ({picture, forums, rawr}) => {

    return (
        <div className="homepage pokeFont">
            <h1>Hello Welcome to my Home page</h1>
            <Navbar picture = {picture}/>
            <h1>Forums</h1>
            <Forums forums = {forums} rawr = {rawr}/>
        </div>
        
    )
}

export default Homepage