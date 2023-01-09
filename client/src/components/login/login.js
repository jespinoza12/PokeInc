import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import Alert from 'react-bootstrap/Alert';
import { useHistory } from "react-router-dom"

const Login = ({ setLoginUser, LoggedIn, rawr}) => {

    const history = useHistory()
    const [message, setMessage] = useState("")
    const [hidden, setHidden] = useState(true)

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9002/backend/login", user)
        .then(res => {
            setLoginUser(res.data.user)
            setMessage(res.data.message)
            setHidden(false)
            try{
                localStorage.setItem('user', res.data.user._id)
                localStorage.setItem('login', true)
                localStorage.setItem('username', res.data.user.username)
                localStorage.setItem('picture', res.data.user.picture)
                localStorage.setItem('description', res.data.user.description)
                localStorage.setItem('loggedIn', "true")

            }catch (err){
                console.log(err)
            }

        })
    }

    return (
        <div className="center m-5 pokeFont">
            <div className="login">
                <Alert key="info" variant="info" hidden={hidden}>
                        {message}
                </Alert>
                <h1>Login</h1>
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
                <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
                <div className="button" onClick={login}>Login</div>
                <div>or</div>
                <div className="button" onClick={() => history.push("/register")}>Register</div>
            </div>
        </div>
    )
}

export default Login