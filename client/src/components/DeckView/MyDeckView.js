import React from "react"
import DeckCard from "./MyDeckCard.js"
const DeckView = ({picture, decks, rawr, rawr2, edit}) => {

    return (
        decks.map((deck) => (
            <div key={deck._id} className='container center'>
              <div>
                <DeckCard deck = {deck} rawr = {rawr} rawr2 = {rawr2} edit = {edit}/>
              </div>
          </div>
        ))
        
    )
}

export default DeckView