import React from 'react'
import Card from "./Card"
import "./card.css"

const Cards = ({card, rawr, cards}) => {
  

return (
    card.map((card) => (
      <div key={card.id} className='container'>
        <div>
          <Card cards = {card} rawr = {rawr} userCards={cards}/>
        </div>
    </div>
  ))
  )}
export default Cards