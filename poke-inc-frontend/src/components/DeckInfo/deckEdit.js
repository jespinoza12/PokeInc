import React from 'react'
import DeckCard from './deckCardEdit';
import "bootstrap/dist/css/bootstrap.min.css";

const DeckEdit = ({deck}) => {

    return (
        deck.cards.map((card) => (
            <div key={card._id} className='container'>
              <div>
                <DeckCard cards = {card}/>
              </div>
          </div>
        ))
    )

}
export default DeckEdit