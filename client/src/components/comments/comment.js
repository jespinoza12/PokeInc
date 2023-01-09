import React, { useState } from 'react'
import axios from "axios"

const Comment = ({comment, getComment}) => {
    var likes = comment.likes
    var dislikes = comment.dislikes
    const [user] = useState({
        likes: comment.likes,
        dislikes: comment.dislikes,
        id: comment._id
    })


    const dislike = () => {
        dislikes += 1
        axios.post("http://localhost:9002/backend/dislike", user)
            .then(res => {
                // alert(res.data)
                console.log("Disliked")
            })
        getComment()

    }

    const like = () => {
        likes += 1
        axios.post("http://localhost:9002/backend/like", user)
            .then(res => {
                // alert(res.data)
                console.log("liked")

            })
        getComment()
    }


return (
          <div className='bg-dark text-white pokeFont m-2 text-break'>
             <div class="card-body center-1 text-break">
                <p>Author: {comment.commenter}</p>
                <p className='wrap'>Comment: {comment.comment}</p>
                <button onClick={like}>Like</button>
                <button onClick={dislike}>Dislike</button>
                <p>Likes: {likes.toString()} &nbsp;
                   Dislikes: {dislikes.toString()}</p>
             </div>
          </div>
    )}

export default Comment