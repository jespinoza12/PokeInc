import React, { useState } from "react"
import Navbar from "../navbar/navbar";
import './profile.css'
import axios from "axios"
import { useHistory } from "react-router-dom"

const Profile = ({setLoginUser, user}) => {

    const history = useHistory()

    const [ User, setUser] = useState({
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        reEnterPassword: user.password,
        picture: user.picture
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...User,
            [name]: value
        })
    }


    const editUser = () => {
        const {id, name, email, username, password, reEnterPassword, picture} = User
        if(picture && id && name && email && username && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/edit", User)
            .then( res => {
                alert(res.data)
                history.push("/")
            })
        } else {
            alert("invlid input")
        }
    }

    return (
        <div>
            <h1 className="center">Welcome {user.name}</h1>
            <Navbar/>
                <img alt="" class="image center-1" src={user.picture}></img>
                <p className="center"><label> Name <input type="name" name="name" value={User.name} placeholder={user.name} onChange={handleChange} ></input></label></p>
                <p className="center"><label> Username <input type="username" name="username" value={User.username} placeholder={user.username} onChange={handleChange}></input></label>
                <label> Email <input type="email" name="email" value={User.email} placeholder={user.email} onChange={handleChange}></input></label></p>
                <p className="center"><label> Password <input type="password" name="password" value={User.password} placeholder="password" onChange={handleChange}></input></label>
                <label> Re-enter password <input type="password" name="reEnterPassword" value={User.reEnterPassword} placeholder="password" onChange={handleChange}></input></label></p>
                <p className="center"><label> Picture Url <input type="picture" name="picture" value={User.picture} placeholder={user.picture} onChange={handleChange}></input></label>
                <button type="button" className="btn-primary m-5" onClick={editUser}>Submit</button></p>
        </div>
            
    )
}

export default Profile