import React from "react"
import "./homepage.css"
import Navbar from "../navbar/navbar";


const Homepage = ({setLoginUser}) => {

    return (
        <div>
            <div className="homepage">
                <Navbar />
                <h1>Hello Welcome to my Home page</h1>
            </div>
        </div>
    )
}

export default Homepage