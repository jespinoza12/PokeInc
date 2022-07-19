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
        <div className="pokeFont">
            <Navbar/>
                <h1 className="center">Welcome, {user.name}</h1>
                <img alt="" class="image center-1" src={user.picture}></img>
                <p className="center">
                    <label> Name &nbsp;
                        <input type="name" name="name" value={User.name} placeholder={user.name} onChange={handleChange} />
                    </label>
                </p>
                <p className="center">
                    <label> Username &nbsp;
                        <input type="username" name="username" value={User.username} placeholder={user.username} onChange={handleChange}/>
                        &nbsp;
                    </label>
                    <label> Email &nbsp;
                        <input type="email" name="email" value={User.email} placeholder={user.email} onChange={handleChange}/>
                        &nbsp;
                    </label>
                </p>
                <p className="center">
                    <label> Password &nbsp;
                        <input type="password" name="password" value={User.password} placeholder="password" onChange={handleChange}/>
                        &nbsp;
                    </label>
                    &nbsp;
                    <label> Re-enter password &nbsp;
                        <input type="password" name="reEnterPassword" value={User.reEnterPassword} placeholder="password" onChange={handleChange}/>
                    </label>
                </p>
                <p className="center">
                    <label> Picture Url &nbsp; 
                        <input type="picture" name="picture" value={User.picture} placeholder={user.picture} onChange={handleChange}/>
                    </label>
                    <button type="button" className="btn-primary m-5" onClick={editUser}>Submit</button>
                </p>
        </div>
            
    )
}

export default Profile