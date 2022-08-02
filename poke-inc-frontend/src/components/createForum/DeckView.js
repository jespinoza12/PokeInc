import React from "react"
import DeckCard from "./DeckCard.js"
import './register.css'
const DeckView = ({picture, decks, rawr, update}) => {

    return (
        decks.map((deck) => (
            <div key={deck._id} className='container-1 register center card'>
              <div>
                <DeckCard deck = {deck} rawr = {rawr} update ={update}/>
              </div>
          </div>
        ))
        
    )
}

export default DeckView