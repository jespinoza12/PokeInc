import React, {useState} from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'
const DeckCard = ({deck, rawr}) => {
  const history = useHistory()
  var random = Math.random();

  const [Deck, setDeck] = useState({
    name: deck.name,
    userId: localStorage.getItem('user'),
    username: localStorage.getItem('username'),
    cards: deck.cards,
    standard: deck.standard,
    description: deck.description,
    cardNum: deck.cardNum
})
  function onClick(e){  
    e.preventDefault();
    rawr(deck)
    history.push("/deckInfo")

  }
  function copyDeck(e){  
    setDeck({
      name: deck.name,
      userId: localStorage.getItem('user'),
      username: localStorage.getItem('username'),
      cards: deck.cards,
      standard: deck.standard,
      description: deck.description,
      cardNum: deck.cardNum
    })
    e.preventDefault();
      axios.post("http://localhost:9002/createDeck", Deck)
        .then(res => {
          console.log("bruh")
          console.log(res.data)
          window.location.reload()
        })
  }

return (
          <div className='card bg-dark text-white pokeFont center'>
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
                      <button className='btn btn-secondary' onClick={onClick}>View Deck</button>
                      <button className='btn btn-secondary' onClick={copyDeck}>Copy Deck</button>

                    </div>
             </div>
          </div>
    )}

export default DeckCard