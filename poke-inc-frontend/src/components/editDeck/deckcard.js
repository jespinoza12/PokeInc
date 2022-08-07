import React from "react"

const Card = ({cards, rawr, num, deckView, deckCards, bruh}) => {

  
  function addCard(e){  
    e.preventDefault();
    console.log('Card Clicked!');
    if (num === 60){
      alert("Cannot Add More than 60")
    }else {
      rawr(cards)
    }

  }

  function deleteCard(e){  
    e.preventDefault();
    console.log('Card Clicked2!');
    

  }


return (
          <div>
            {
              deckView? <img className='mt-2 btn ' onClick={deleteCard} src={cards.images.small} alt={cards.name}></img> 
              : <img className='mt-2 btn ' onClick={addCard} src={cards.images.small} alt={cards.name}></img>
            }
            <p></p>
            {
              deckView? <button className="center-1" onClick={deleteCard}>Delete</button> : <button onClick={addCard} className="center-1">Add</button>
            }
          </div>
    )}

export default Card