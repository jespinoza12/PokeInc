import React, { useState } from "react"
import "./register.css"
import Navbar from "../navbar/navbar"
import DeckView from "./DeckView"
import axios from "axios"
import { useHistory } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from 'react-bootstrap/Alert';


const Forum = ({decks, rawr, sdeck}) => {

    const history = useHistory()
    const current = new Date();
    const [message, setMessage] = useState("")
    const [varient, setVarient] = useState("")
    const [hidden, setHidden] = useState(true)
    const [updat, setUpdated] = useState(false)
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
    const [ user, setUser] = useState({
        name: "",
        authorId: localStorage.getItem('user'),
        username: localStorage.getItem('username'),
        content:"",
        deck: [{
            cards: sdeck.cards,
            name: sdeck.name,
            standard: sdeck.standard,
            description: sdeck.description,
            cardNum: sdeck.cardNum,
            userId: sdeck.userId,
        }],
        created: date
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
        console.log(user)
    }

    

    const createForum = () => {
        const { name, content } = user
        if( name && content){
            axios.post("http://localhost:9002/createForum", user)
            .then( res => {
                // alert(res.data.message)
                setMessage(res.data.message)
                setVarient("success")
                setHidden(false)
            })
        } else {
            setVarient("danger")
            setMessage("Oopsies thats not supposed to happen, you might have no name or context")
            setHidden(false)
        }
    }

    const update = () => {
        setUser({
            name: user.name,
            authorId: localStorage.getItem('user'),
            username: localStorage.getItem('username'),
            content: user.content,
            deck: [{
            cards: sdeck.cards,
            name: sdeck.name,
            standard: sdeck.standard,
            description: sdeck.description,
            cardNum: sdeck.cardNum,
            userId: sdeck.userId,
            }],
            created: date
        })
        setUpdated(true)
    }

    return (
        <div className="center pokeFont">
            <Navbar/>
            <Alert key={varient} variant={varient} hidden={hidden}>
                    {message}
            </Alert>
            <div className="register center-1">
                {console.log("User", user)}
                <label>Selected Deck: {sdeck.name}</label>
                <input type="text" name="name" value={user.name} placeholder="Forum Name" onChange={ handleChange }></input>
                <textarea type="content" name="content" value={user.content} placeholder="Content" onChange={ handleChange }></textarea>
                {updat? <div className="button" onClick={createForum} >Create Forum</div>: <div className="button" onClick={update} >Update</div>}
            </div>
            <h2>My Decks</h2>
            <DeckView decks = {decks} rawr = {rawr} update = {setUpdated}/>
        </div>
    )
}

export default Forum