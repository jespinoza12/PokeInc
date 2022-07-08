import React from "react"
import "./homepage.css"
import Navbar from "../navbar/navbar";
const Homepage = ({setLoginUser}) => {

    return (
        <div className="homepage">
            <h1>Hello Welcome to my Home page</h1>
            <Navbar />  
        </div>
        
    )
}

export default Homepage