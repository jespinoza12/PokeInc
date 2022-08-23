import React from 'react'
import Card from "./Card"
import "./card.css"

const Cards = ({card, rawr}) => {
  

return (
    card.map((card) => (
      <div key={card.id} className='container'>
        <div>
          <Card cards = {card} rawr = {rawr}/>
        </div>
    </div>
  ))
  )}
export default Cards