import React from 'react'

const deckCard = ({cards}) => {

  
  function onClickR(e){  
    e.preventDefault();


  }
  function onClickA(e){  
    e.preventDefault();

  }

return (
          <div>
            <img className='mt-2 btn ' src={cards.images.small} alt={cards.name}></img>
            <div className='center'>
              <button onClick={onClickR}>Remove</button>
              <button onClick={onClickA}>Add</button>
            </div>
          </div>
    )}

export default deckCard