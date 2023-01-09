import React, { useEffect, useState } from 'react'
import Card from "./myCard"
import "./card.css"

const MyCards = ({card, rawr, cards}) => {

return (
    card.map((card) => (
      <div key={card.id} className='container'>
        <div>
          <Card cards = {card} rawr = {rawr} userCards={cards}/>
        </div>
    </div>
  ))
  )}
export default MyCards