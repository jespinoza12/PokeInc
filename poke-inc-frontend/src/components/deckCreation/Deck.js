import React from 'react'
import Card from "./deckcard"
import "./deck.css"

const Deck = ({card, rawr, deckname, deckCards, user, num}) => {
  

return (
    card.map((card) => (
      <div key={card.id} className='container'>
        <div>
          <Card cards = {card} rawr = {rawr} userId = {user} deckname = {deckname} deckcards = {deckCards} num = {num}/>
        </div>
    </div>
  ))
  )}
export default Deck