import React from "react"
import DeckCard from "./DeckCard.js"
const DeckView = ({picture, decks, rawr}) => {

    return (
        decks.map((deck) => (
            <div key={deck._id} className='container'>
              <div>
                <DeckCard deck = {deck} rawr = {rawr}/>
              </div>
          </div>
        ))
        
    )
}

export default DeckView