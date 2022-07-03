import React from "react"
import "./homepage.css"


const Homepage = ({setLoginUser}) => {
    return (
        <div className="homepage">
            <h1>Hello Welcome to my Home page</h1>
            <div className="button" onClick={() => setLoginUser({})} >Logout</div>
        </div>
    )
}

export default Homepage