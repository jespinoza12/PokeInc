import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Card = ({cards, rawr, user, deckname, deckcards, num}) => {
  const history = useHistory()

  
  function cardHandler(e){  
    e.preventDefault();
    console.log('Card Clicked!');
    if (num === 60){
      alert("Cannot Add More than 60")
    }else {
      rawr(cards)
    }

  }

return (
          <div>
            <img className='mt-2 btn ' onClick={cardHandler} src={cards.images.small} alt={cards.name}></img>
          </div>
    )}

export default Card