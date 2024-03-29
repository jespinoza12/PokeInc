import React from 'react'
import logo from "./pokeball.png"
import "./cardInfo.css"
import {useState, useEffect} from 'react'
import Navbar from '../navbar/navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const CardInfo = ({ card, picture, userCards }) => {
    
    const [collection, setCollection] = useState({
        id: localStorage.getItem('user'),
        card: card
    })

    useEffect(() => {
        setCollection({
            id: localStorage.getItem('user'),
            card: card
        })
      }, []);



    const addToCollection = () => {
        const { card, id } = collection
        if( id && card){
            axios.post("https://poke-inc.herokuapp.com/backend/updateCollection", collection)
            .then( res => {
               alert(res.data)
            })
        } else {
        }
    }

    return (
        <body className='body pokeFont'>
            <Navbar picture = {picture} />
            <h1 className='m-2 center pokeFont'>{card.name}</h1>
            <p className='m-2 center pokeFont'><img className='pokeBall center-1' src={logo} alt="loading..."/><label><h2 className=''>#{card.nationalPokedexNumbers[0]}</h2></label></p>
            <p>:</p>
            <div class="detailBox center-1">
                <div class="row">
                    <div class="col-sm-3">
                        <div className='float-left center-1 img'>
                            <img className='img' src={card.images.large} alt={card.name}></img>
                        </div>
                    </div>
                    <div class="col">
                        <p className='center-1 pt-5'>
                            <label>Attacks:
                                <h2>{card.attacks[0].name}</h2>
                                <p>{card.attacks[0].text}</p>
                                <h2>{card.attacks[1]?.name}</h2>
                                <p>{card.attacks[1]?.text}</p>
                            </label>
                            <p></p>
                            <p>
                                <label> Card Series:
                                    <h3>{card.set.series}</h3>
                                </label>
                            </p>
                            <label> Card Set:
                                <h3>{card.set.name}</h3>
                            </label>
                            <p>
                                <label> Average Price:
                                    <h3>${card.cardmarket.prices.averageSellPrice}</h3>
                                </label>
                                <p></p>
                                <label>Rarity:
                                    <h3>{card.rarity}</h3>
                                </label>
                                <p></p>
                                <a class="btn btn-primary" href="/collection">&#8678; Back</a>
                                <button className='btn btn-secondary' onClick={addToCollection}>Add Card to Collection</button>
                            </p>
                        </p>
                    </div>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
                </div>
            </div>
        </body>
    )

}
export default CardInfo