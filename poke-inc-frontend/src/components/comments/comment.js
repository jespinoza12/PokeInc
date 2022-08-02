import React, { useState } from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom"

const Comment = ({comment}) => {
    const history = useHistory()
    console.log(comment)
    var likes = comment.likes
    var dislikes = comment.dislikes
    
    const [user, setUser] = useState({
        likes: comment.likes,
        dislikes: comment.dislikes,
        id: comment._id
    })
    

    const dislike = () => {
        dislikes += 1 
        if(1 === 1){
            axios.post("http://localhost:9002/dislike", user)
            .then( res => {
                alert(res.data)
            })
        } else {
            alert("invlid input")
        }
    }

    const like = () => {
        likes += 1
        if(1 === 1){
            axios.post("http://localhost:9002/like", user)
            .then( res => {
                alert(res.data)
            })
        } else {
            alert("invlid input")
        }
    }


return (
          <div className='bg-dark text-white pokeFont m-2'>
             <div class="card-body">
                <p>Author: {comment.commenter}</p>
                <p>Comment: {comment.comment}</p>
                <button onClick={like}>Like</button>
                <button onClick={dislike}>Dislike</button>
                <p>Likes: {likes.toString()} &nbsp;
                   Dislikes: {dislikes.toString()}</p>
             </div>
          </div>
    )}

export default Comment