import React from "react"
import "./deck.css"

const Card = ({cards, rawr, num, check, rawr2}) => {

  
  function cardHandler(e){  
    e.preventDefault();
    console.log('Card Clicked!');
    if (num === 60){
      alert("Cannot Add More than 60")
    }else {
      rawr(cards)
    }

  }

  function cardHandler2(e){  
    e.preventDefault();
    console.log('Card Clicked!');
    if (num === 0){
      alert("Cannot remove")
    }else {
      rawr2(cards._id)
    }

  }

return (
          <div>
            {
              check? <img className='btn ' onClick={cardHandler2} src={cards.card?.images.small } alt={cards.card?.name}></img> : <img className='mt-2 btn ' onClick={cardHandler} src={cards.images?.small} alt={cards?.name}></img>
            }
            <p></p>
            {
              check? <button className="center-1 btn btn-secondary" onClick={cardHandler2}>Delete</button> : <button  className="center-1 btn btn-secondary" onClick={cardHandler}>Add</button>
            }
          </div>
    )}

export default Card