import axios from 'axios';
import {useState} from 'react'
import { useHistory } from "react-router-dom"

const MyDeckCard = ({deck, rawr, rawr2, edit}) => {
  const history = useHistory()

  const [decks, setDeck] = useState({
    deckId: deck._id
  })
  
  function onClick(e){  
    e.preventDefault();
    rawr(deck)
    history.push(process.env.PUBLIC_URL + "/deckInfo")

  }
  function onClick1(e){
    e.preventDefault();
    rawr(deck)
    rawr2()
    edit(true)
    history.push(process.env.PUBLIC_URL + "/editDeck")

  }
  function onClick2(e){
        setDeck({
          deckId: deck._id
        })
        const {deckId} = decks
        if (deckId){
          axios.post("http://localhost:9002/deleteDeck", decks)
          window.location.reload()
        }else{
          console.log("Oops")
        }
    
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