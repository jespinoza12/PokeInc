import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        username:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email,username, password, reEnterPassword } = user
        if( name && email && username && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/register", user)
            .then( res => {
                alert(res.data.message)
                history.push("/")
            })
        } else {
            alert("invlid input")
        }
    }

    return (
        <div className="center m-5">
            <div className="register">
                {console.log("User", user)}
                <h1>Register</h1>
                <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
                <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
                <input type="username" name="username" value={user.username} placeholder="Username" onChange={ handleChange }></input>
                <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
                <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
                <div className="button" onClick={register} >Register</div>
                <div>or</div>
                <div className="button" onClick={() => history.push("/")}>Login</div>
            </div>
        </div>
    )
}

export default Register