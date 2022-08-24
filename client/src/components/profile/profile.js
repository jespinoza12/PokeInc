import React, { useState } from "react"
import Navbar from "../navbar/navbar";
import './profile.css'
import axios from "axios"
import Alert from 'react-bootstrap/Alert';


const Profile = ({setLoginUser, user}) => {

    const [message, setMessage] = useState("")
    const [varient, setVarient] = useState("")
    const [hidden, setHidden] = useState(true)
    const [ User, setUser] = useState({
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        password: "",
        reEnterPassword: "",
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
            axios.post("https://poke-inc.herokuapp.com/backend/edit", User)
            .then( res => {
                // alert(res.data)
                setMessage(res.data)
                setHidden(false)
                setVarient("success")
            })
        } else {
            setVarient("danger")
            setMessage("Oopsie, that not supposed to happen, try again")
            setHidden(false)
        }
    }

    return (
        <div className="pokeFont center">
            <Navbar/>
            <Alert key={varient} variant={varient} hidden={hidden}>
                    {message}
            </Alert>
                <div className="container bg-dark text-white m-2 ">
                <h1 className="center m-2">Welcome, {user.name}</h1>
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
        </div>
            
    )
}

export default Profile