import React from "react"
import DeckCard from "./DeckCard.js"
const DeckView = ({picture, decks}) => {

    return (
        decks.map((deck) => (
            <div key={deck._id} className='container'>
              <div>
                <DeckCard deck = {deck}/>
              </div>
          </div>
        ))
        
    )
}

export default DeckView