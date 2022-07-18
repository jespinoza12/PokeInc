import React from 'react'
import logo from "./pokeball.png" 
import "./cardInfo.css"
import Navbar from '../navbar/navbar'

const CardInfo = ({card}) => {
  

return (
    <div className=''>
        <Navbar/>
        <img className='pokeBall m-3' alt='' src={logo}/><label><h2 className=''>{card.nationalPokedexNumbers[0]}</h2></label>
        <div className='cardImage m-3'>
            <img src={card.images.large} alt={card.name}></img>
        </div>
        <div className='pokemonDetails'>
            <label><h1>{card.name}, Lvl: {card.level}</h1></label>
            <label>HP: <h2>{card.hp}</h2></label>
            <label>Attacks: <h2>{card.attacks[0].name}</h2><p>{card.attacks[0].text}</p></label>
        </div>
    </div>
    )

}
export default CardInfo