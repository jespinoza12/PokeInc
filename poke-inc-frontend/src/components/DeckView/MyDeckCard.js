import React from 'react'
import { useHistory } from "react-router-dom"

const MyDeckCard = ({deck, rawr}) => {
  const history = useHistory()
  
  function onClick(e){  
    e.preventDefault();
    rawr(deck)
    history.push("/deckInfo")

  }
  function onClick1(e){
    e.preventDefault();
    rawr(deck)
    history.push("/deckInfo")

  }
  function onClick2(e){
    e.preventDefault();

  }

return (
          <div className='card bg-dark text-white pokeFont'>
             <div class="card-body">
                    <h5 class="card-title">{deck.name}</h5>
                    <label>Creator:<p>{deck.username}</p></label>
                    <p></p>
                    <label>Description: <p>{deck.description}</p></label>
                    <p></p>
                    <label>Total Cards: <p>{deck.cardNum}</p></label>
                    <p></p>
                    <label>Standard: <p>{deck.standard}</p></label>
                    <p></p>
                    <div className='btn-group'>
                      <button className='btn btn-secondary' onClick={onClick}>View</button>
                      <button className='btn btn-secondary mx-auto' onClick={onClick1}>Edit</button>
                      <button className='btn btn-secondary' onClick={onClick2}>Delete</button>
                    </div>
             </div>
          </div>
    )}

export default MyDeckCard