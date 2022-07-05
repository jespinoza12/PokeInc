import React from "react"
import Navbar from "../navbar/navbar";


const Profile = ({setLoginUser}) => {
    return (
            <div className="homepage">
                <Navbar />
                <h1>Welecome to Profile</h1>
            <div className="button" onClick={() => setLoginUser({})} >Logout</div>
            </div>
    )
}

export default Profile