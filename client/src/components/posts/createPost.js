import React, { useState } from "react"
import "./post.css"
import Navbar from "../navbar/navbar"
import DeckView from "../createForum/DeckView"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from 'react-bootstrap/Alert';


const CreatePost = ({decks, rawr, sdeck}) => {

    const current = new Date();
    const [message, setMessage] = useState("")
    const [varient, setVarient] = useState("")
    const [hidden, setHidden] = useState(true)
    const [updat, setUpdated] = useState(false)
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
    const [ post, setPost] = useState({
        caption: "",
        hashtags:"",
        authorId: localStorage.getItem('user'),
        username: localStorage.getItem('username'),
        deck: [{
            cards: sdeck.cards,
            name: sdeck.name,
            username: sdeck.username,
            standard: sdeck.standard,
            description: sdeck.description,
            cardNum: sdeck.cardNum,
            userId: sdeck.userId,
        }],
        created: date
    })

    const handleChange = e => {
        const { name, value } = e.target
        setPost({
            ...post,
            [name]: value
        })
    }

    

    const createForum = () => {
        const { caption, hashtags } = post
        if( caption && hashtags){
            axios.post("http://localhost:9002/backend/createPost", post)
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
        setPost({
            caption: post.caption,
            authorId: localStorage.getItem('user'),
            username: localStorage.getItem('username'),
            hashtags: post.hashtags,
            deck: [{
            cards: sdeck.cards,
            name: sdeck.name,
            username: sdeck.username,
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
                {console.log("Post", post)}
                <label>Selected Deck: {sdeck.name}</label>
                <input type="text" name="caption" value={post.caption} placeholder="Caption" onChange={ handleChange }></input>
                <textarea type="text" name="hashtags" value={post.hashtags} placeholder="hashtags" onChange={ handleChange }></textarea>
                {updat? <div className="button" onClick={createForum} >Create Forum</div>: <div className="button" onClick={update} >Update</div>}
            </div>
            <h2>All Decks</h2>
            <DeckView decks = {decks} rawr = {rawr} update = {setUpdated}/>
        </div>
    )
}

export default CreatePost