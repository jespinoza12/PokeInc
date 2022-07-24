import React from 'react'
import { useHistory } from "react-router-dom"

const Card = ({cards, rawr}) => {
  const history = useHistory()
  
  function cardHandler(e){  
    e.preventDefault();
    console.log('Card Clicked!');
    console.log(cards);
    rawr(cards);
    


  }

return (
          <div>
            <img className='mt-2 btn ' onClick={cardHandler} src={cards.images.small} alt={cards.name}></img>
          </div>
    )}

export default Card