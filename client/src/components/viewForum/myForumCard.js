import React, { useState } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom"

const MyForumCard = ({forum, rawr}) => {
  const history = useHistory()
  const [forums, setFourm] = useState({
    forumId: forum._id
  })

  async function onClick(e){  
    e.preventDefault();
    localStorage.setItem('forum', forum._id)
    rawr(forum)
    history.push(process.env.PUBLIC_URL + "/forumInfo")

  }

  function onClick2(e){
    setFourm({
      forumId: forum._id
    })
    const {forumId} = forums
    if (forumId){
      axios.post("http://localhost:9002/backend/deleteForum", forums)
      window.location.reload()
    }else{
      console.log("Oops")
    }

}

return (
          <div className='card bg-dark text-white'>
             <div class="card-body">
                <h4>{forum.name}</h4>
                <p>Author: {forum.username}</p>
                <p>Date Created: {forum.created}</p>
                <div className='btn-group center-1'>
                    <button className='btn btn-secondary' onClick={onClick}>View Forum</button>
                    <button className='btn btn-secondary' onClick={onClick2}>Delete Forum</button>
                </div>
             </div>
          </div>
    )}

export default MyForumCard