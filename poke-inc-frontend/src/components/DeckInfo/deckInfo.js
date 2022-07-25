import React from 'react'
import Navbar from '../navbar/navbar'
import DeckCard from '../DeckInfo/deckCard';
import "bootstrap/dist/css/bootstrap.min.css";

const DeckInfo = ({deck, picture, rawr}) => {

    return (
        deck.cards.map((card) => (
            <div key={card._id} className='container'>
              <div>
                <DeckCard cards = {card} rawr = {rawr}/>
              </div>
          </div>
        ))
    )

}
export default DeckInfo