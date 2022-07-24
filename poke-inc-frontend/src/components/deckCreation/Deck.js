import React from 'react'
import Card from "./deckcard"
import "./deck.css"

const Deck = ({card, rawr}) => {
  

return (
    card.map((card) => (
      <div key={card.id} className='container'>
        <div>
          <Card cards = {card} rawr = {rawr}/>
        </div>
    </div>
  ))
  )}
export default Deck