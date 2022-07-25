import React from 'react'
import { useHistory } from "react-router-dom"

const deckCard = ({cards, rawr}) => {


return (
          <div>
            <img className='mt-2 btn ' src={cards.images.small} alt={cards.name}></img>
          </div>
    )}

export default deckCard