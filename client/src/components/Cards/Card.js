import React from 'react'
import { useHistory } from "react-router-dom"

const Card = ({cards, rawr}) => {
  const history = useHistory()
  
  function cardHandler(e){  
  e.preventDefault();
  console.log('Login Form Submitted!');
  rawr(cards);
  history.push(process.env.PUBLIC_URL + "/cardInfo")

  }

return (
          <div>
            <img className='mt-2 btn ' onClick={cardHandler} src={cards.images.small} alt={cards.name}></img>
          </div>
    )}

export default Card