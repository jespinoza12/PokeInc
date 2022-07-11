import React from 'react'
import "./card.css"
const Cards = ({card}) => {
  

return (
    card.map((card) => (
        <div key={card.id} className='container'>
          <div>
            <img src={card.images.small} alt={card.name}></img>
          </div>
      </div>   
      
    ))
    )}


export default Cards