import React from 'react'
import { useHistory } from "react-router-dom"

const ForumCard = ({forum, rawr}) => {
  const history = useHistory()
  
  async function onClick(e){  
    e.preventDefault();
    localStorage.setItem('forum', forum._id)
    rawr(forum)
    history.push("/forumInfo")

  }

return (
          <div className='bg-dark text-white pokeFont m-2'>
             <div class="card-body">
                <h4>{forum.name}</h4>
                <p>Author: {forum.username}</p>
                <p>Date Created: {forum.created}</p>
                <button className='btn btn-secondary center-1' onClick={onClick}>View Forum</button>
             </div>
          </div>
    )}

export default ForumCard