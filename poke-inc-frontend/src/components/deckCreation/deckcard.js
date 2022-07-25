import React from "react"

const Card = ({cards, rawr, num}) => {

  
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