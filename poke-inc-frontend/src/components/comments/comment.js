import React, { useState } from 'react'
import axios from "axios"

const Comment = ({comment}) => {
    console.log(comment)
    var likes = comment.likes
    var dislikes = comment.dislikes
    const [user] = useState({
        likes: comment.likes,
        dislikes: comment.dislikes,
        id: comment._id
    })


    const dislike = () => {
        dislikes += 1
        axios.post("http://localhost:9002/dislike", user)
            .then(res => {
                // alert(res.data)
                console.log("Disliked")
            })

    }

    const like = () => {
        likes += 1
        axios.post("http://localhost:9002/like", user)
            .then(res => {
                // alert(res.data)
                console.log("liked")

            })
    }


return (
          <div className='bg-dark text-white pokeFont m-2'>
             <div class="card-body">
                <p>Author: {comment.commenter}</p>
                <p>Comment: {comment.comment}</p>
                <button onClick={like}>Like</button>
                <button>Dislike</button>
                <p>Likes: {likes.toString()} &nbsp;
                   Dislikes: {dislikes.toString()}</p>
             </div>
          </div>
    )}

export default Comment