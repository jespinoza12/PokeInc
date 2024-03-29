import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

const DeckCard = ({deck, rawr, update}) => {
  
  function onClick(e){  
    e.preventDefault();
    rawr(deck)
    update(false);
  }

return (
          <div className='card bg-dark text-white'>
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
                    <button className='btn btn-secondary' onClick={onClick}>Select Deck</button>
             </div>
          </div>
    )}

export default DeckCard