import React from 'react'

const deckCard = ({cards}) => {


return (
          <div>
            <img className='mt-2 btn ' src={cards.card.images.small} alt={cards.name}></img>
          </div>
    )}

export default deckCard