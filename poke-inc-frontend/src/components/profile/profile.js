import React, { useState } from "react"
import Navbar from "../navbar/navbar";
import './profile.css'
import axios from "axios"
import { useHistory } from "react-router-dom"

const Profile = ({setLoginUser, user}) => {

    const history = useHistory()

    const [ updatedUser, setUser] = useState({
        name: "",
        email: user.email,
        password:"",
        reEnterPassword: "",
        picture: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...updatedUser,
            [name]: value
        })
    }


    const editUser = () => {
        const {name, email, username, password, reEnterPassword, picture} = updatedUser
        if(name && picture && email && username && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/edit", updatedUser)
            .then( res => {
                alert(res.data.message)
            })
        } else {
            alert("invlid input")
        }
    }

    return (
        <div>
            <h1 className="center">Welcome {user.name}</h1>
            <Navbar/>
                <label><img alt="" class="image" src={user.picture}></img></label>
                <label> Name <input type="name" name="name" value={updatedUser.name} placeholder={user.name} onChange={handleChange} ></input></label>
                <label> Username <input type="username" name="username" value={updatedUser.username} placeholder={user.username} onChange={handleChange}></input></label>
                <label> Email <input type="email" name="email" value={updatedUser.email} placeholder={user.email} onChange={handleChange}></input></label>
                <label> Password <input type="password" name="password" value={updatedUser.password} placeholder="password" onChange={handleChange}></input></label>
                <label> Re-enter password <input type="password" name="reEnterPassword" value={updatedUser.reEnterPassword} placeholder="password" onChange={handleChange}></input></label>
                <button type="button" className="btn-primary m-5" onClick={editUser}>Submit</button>
        </div>
            
    )
}

export default Profile