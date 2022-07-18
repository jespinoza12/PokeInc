import React from 'react'
import logo from "./pokeball.png" 
import "./cardInfo.css"
import Navbar from '../navbar/navbar'

const CardInfo = ({card}) => {
  

return (
    <div className='container-1'>
        <Navbar/>
        <h1 className='center'>{card.name}</h1>

        <p className='center'><img className='pokeBall m-1 center' alt='' src={logo}/><label><h2 className=''>{card.nationalPokedexNumbers[0]}</h2></label></p>
        <div className='cardImage m-3 center'>
            <img src={card.images.large} alt={card.name}></img>
        </div>
        <div className='container-2 m-5 center'>
            <p><label>Type: <h2>{card.types}</h2></label></p>
            <p>
                <label>Attacks: 
                    <h2>{card.attacks[0].name}</h2>
                    <p>{card.attacks[0].text}</p>
                </label>
            </p>
            <p>
                <label>Rarity: 
                    <h2>{card.rarity}</h2>
                </label>
            </p>
            <p>
                <label>Rarity: 
                    <h2>{card.rarity}</h2>
                </label>
            </p>
            <p>
                <label>Average Price: 
                    <h2>${card.cardmarket.prices.averageSellPrice}</h2>
                </label>
            </p>
            <p>
                <label>Card Set: 
                    <h2>{card.set.name}</h2>
                </label>
            </p>
            <p>
                <label>Card Series: 
                    <h2>{card.set.series}</h2>
                </label>
            </p>            
        </div>
    </div>
    )

}
export default CardInfo