import React from "react"
import DeckCard from "./DeckCard.js"
import "./forum.css"
const DeckView = ({picture, decks, rawr}) => {

    return (
        decks.map((deck) => (
            <div key={deck._id} className='container-1 m-2'>
              <div>
                <DeckCard deck = {deck} rawr = {rawr}/>
              </div>
          </div>
        ))
        
    )
}

export default DeckView