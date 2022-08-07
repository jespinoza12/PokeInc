import React, {useEffect} from 'react'
import Card from "./deckcard"
import "./deck.css"

const EditDeck = ({card, rawr, deckname, deckCards, user, num, deckView, bruh}) => {

return (
    card.map((card) => (
      <div key={card.id} className='container'>
        <div>
          <Card cards = {card} rawr = {rawr} userId = {user} deckname = {deckname} deckcards = {deckCards} num = {num} deckView = {deckView} bruh={bruh}/>
        </div>
    </div>
  ))
  )}
export default EditDeck