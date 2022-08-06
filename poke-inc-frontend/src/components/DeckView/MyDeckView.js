import React from "react"
import DeckCard from "./MyDeckCard.js"
const DeckView = ({picture, decks, rawr}) => {

    return (
        decks.map((deck) => (
            <div key={deck._id} className='container center'>
              <div>
                <DeckCard deck = {deck} rawr = {rawr}/>
              </div>
          </div>
        ))
        
    )
}

export default DeckView