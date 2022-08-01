import React, { useState } from "react"
import "./register.css"
import Navbar from "../navbar/navbar"
import DeckView from "./DeckView"
import axios from "axios"
import { useHistory } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";


const Forum = ({decks, rawr, selectedDeck}) => {

    const history = useHistory()
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
    const [ user, setUser] = useState({
        name: "",
        authorId: localStorage.getItem('user'),
        username: localStorage.getItem('username'),
        content:"",
        deck: selectedDeck,
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
        const { name, content, deck, created, username, authorId } = user
        if( name && content){
            axios.post("http://localhost:9002/createForum", user)
            .then( res => {
                alert(res.data.message)
                history.push("/home")
            })
        } else {
            alert("invlid input")
        }
    }

  

    return (
        <div className="center pokeFont">
            <Navbar/>
            <div className="register center-1">
                {console.log("User", user)}
                <label>Selected Deck: {selectedDeck.name}</label>
                <input type="text" name="name" value={user.name} placeholder="Forum Name" onChange={ handleChange }></input>
                <textarea type="content" name="content" value={user.content} placeholder="Content" onChange={ handleChange }></textarea>
                <div className="button" onClick={createForum} >Create Forum</div>
            </div>
            <h2>My Decks</h2>
            <DeckView decks = {decks} rawr = {rawr}/>
        </div>
    )
}

export default Forum