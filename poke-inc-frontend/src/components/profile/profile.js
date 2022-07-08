import React from "react"
import Navbar from "../navbar/navbar";


const Profile = ({setLoginUser, user}) => {

    

    return (
        <div>
            <h1 className="center">Welecome {user.name}</h1>
            <Navbar/>

            <form>
                <label>
                Picture <input type="Link" placeholder="Link to Picutre"></input>
                </label>
                <label>
                Name <input type="name" placeholder={user.name}></input>
                </label>
                <label>
                Username <input type="username" placeholder={user.username}></input>
                </label>
                <label>
                Email <input type="email" placeholder={user.username}></input>
                </label>
                <label>
                password <input type="password" placeholder="password"></input>
                </label>
                <label>
                re-enter password <input type="re-enterpassword" placeholder="password"></input>
                </label>
            </form>
        </div>
            
    )
}

export default Profile