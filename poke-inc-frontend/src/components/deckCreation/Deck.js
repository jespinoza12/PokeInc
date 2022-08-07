import React from 'react'
import Card from "./deckcard"
import "./deck.css"

const Deck = ({card, rawr, deckname, deckCards, user, num, check, rawr2}) => {
  

return (
    card.map((card) => (
      <div key={card.id} className='container m-2'>
        <div>
          <Card cards = {card} rawr = {rawr} userId = {user} deckname = {deckname} deckcards = {deckCards} num = {num} check={check} rawr2 = {rawr2}/>
        </div>
    </div>
  ))
  )}
export default Deck