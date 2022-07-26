import React from 'react';
import Homepage from "./components/homepage/homepage"
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login"
import Register from "./components/register/register"
import Cards from "./components/Cards/Cards"
import DeckInfo from './components/DeckInfo/deckInfo';
import CardInfo from "./components/cardInfo/CardInfo"
import CreateDeck from "./components/deckCreation/Deck"
import Profile from "./components/profile/profile"
import DeckView from './components/DeckView/DeckView'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import pokemon from 'pokemontcgsdk'
import Navbar from './components/navbar/navbar';
import logo from './images/gif.gif'
import axios from "axios"
function App() {
  //State Variable
  const [user, setLoginUser] = useState({})
  const [userId1, setUserId] = useState("")
  const [username1, setUsername] = useState("")
  const [deckFlavor, setDeckDescription] = useState("")
  const [picture, setPicture] = useState("")
  const [mydecks, setMyDecks] = useState([])
  const [deckStandard, setDeckStandard] = useState("")
  const [decks, setDecks] = useState([])
  const [cards, setCards] = useState([])
  const [num, setNum] = useState(0)
  const [deck, setDeck] = useState([])
  const [filter, setFilter] = useState("")
  const [deckname, setDeckName] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [canCreate, setCanCreate] = useState(false);
  const [filteredCards, setFilteredCards] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [clickedCard, setCard] = useState([])
  const [clickedDeck, setClickedDeck] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [Deck, setDeck1] = useState({});
  //Filters
  const [typeFilter, setTypeFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  pokemon.configure({ apiKey: 'ca37f52b-e2ad-4d7c-885a-2ddd6838eb63' })
  //Gets data whenever page is changed
  useEffect(() => {
    if (filter === "Energy") {
      getAllEnergy()
    } else if (filter === "Pokemon") {
      getAllPokemon()
    } else if (filter === "Trainer") {
      getAllTrainer()
    } else {
      getData()
      getFilteredCards()
      getCardsByType()
    }
    getAllDecks()
    getMyDecks()
    setUserId(localStorage.getItem('user'))
    setUsername(localStorage.getItem('username'))
    setPicture(localStorage.getItem('picture'))
  }, [pageNum], []);
  //Increases Page num
  const increasePageNum = () => {
    const increasedPageNum = pageNum + 1
    setPageNum(increasedPageNum)
    console.log(pageNum)
  }
  //Decreases Page num
  const decreasePageNum = () => {
    const decreasedPageNum = pageNum - 1
    if (decreasedPageNum < 1) {
      setPageNum(1)
    } else {
      setPageNum(decreasedPageNum)
    }
  }
  //Name Filter
  useEffect(() => {
    console.log(`Name: ${nameFilter}`)
    if (nameFilter === "") {
      setFiltered(false)
      setPageNum(1)
      getData()
      getFilteredCards()
    } else {
      setFilter("")
      setPageNum(1)
      setFiltered(true);
      getFilteredCards();
      console.log(cards)
    }
  }, [nameFilter]);
  //Type Filter
  useEffect(() => {
    console.log(`type: ${typeFilter}`)

    if (typeFilter === "") {
      setFiltered(false);
      getData()
      setPageNum(1)
    } else {
      setFilter("")
      getCardsByType();
      setPageNum(1)
      setFiltered(true);
      console.log(cards)
    }

  }, [typeFilter]);
  useEffect(() => {
    console.log(`DeckName: ${deckname}`)

  }, [deckname]);
  //Gets Cards
  const getData = () => {
    setLoading(true)
    pokemon.card.where({ pageSize: 50, page: pageNum })
      .then(data => {
        setLoading(false)
        setCards(data.data)
        console.log(data.data)
      })
  }
  //Gets Filtered Cards
  const getFilteredCards = () => {
    setLoading(true)
    pokemon.card.where({ q: "name:" + nameFilter.toLowerCase(), pageSize: 50, page: pageNum })
      .then(result => {
        setFilteredCards(result.data)
        setLoading(false)
        console.log(result.data)

      })
  }
  //Gets card by type
  const getCardsByType = () => {
    setLoading(true)
    pokemon.card.where({ q: "types:" + typeFilter.toLowerCase(), pageSize: 50, page: pageNum })
      .then(result => {
        console.log(result.data)
        setLoading(false)
        setFilteredCards(result.data)
      })
  }
  //Gets All Pokemon and only Pokemon
  const getAllPokemon = () => {
    setLoading(true)
    setFilter("Pokemon")

    pokemon.card.where({ q: "supertype:Pokémon", pageSize: 50, page: pageNum })
      .then(result => {
        console.log(result.data)
        setLoading(false)
        setFilteredCards(result.data)
        setFiltered(true);

      })
  }
  //Gets all energy and only energy
  const getAllEnergy = () => {
    setLoading(true)
    setFilter("Energy")

    pokemon.card.where({ q: "supertype:Energy", pageSize: 50, page: pageNum })
      .then(result => {
        console.log(result.data)
        setLoading(false)
        setFilteredCards(result.data)
        setFiltered(true);

      })
  }
  //Gets all trainer cards
  const getAllTrainer = () => {
    setLoading(true)
    setFilter("Trainer")
    pokemon.card.where({ q: "supertype:Trainer", pageSize: 50, page: pageNum })
      .then(result => {
        console.log(result.data)
        setLoading(false)
        setFilteredCards(result.data)
        setFiltered(true);

      })
  }
  //Gets selected cards
  const getCard = (card) => {
    setCard(card)
  }
  //Gets Selected Deck
  const getDeck = (deck) => {
    setClickedDeck(deck)
  }
  //Adds card to deck
  const addCardToDeck = (card) => {
    if (num > 60) {
      alert("You have more than 60 cards")
      setNum(60)
    } else {
      setDeck(current => [...current, card]);
      console.log(deck)
      setNum(num + 1)
    }
  }
  //Creates Deck
  const createDeck = () => {
    console.log(Deck)
    if (canCreate === true) {
      axios.post("http://localhost:9002/createDeck", Deck)
        .then(res => {
          alert(res.data.message)
        })
      setCanCreate(false)
    } else {
      alert("Update First")
    }
  }
  //Updates Deck for creation
  const updateDeck = () => {
    setDeck1({
      name: deckname,
      userId: userId1,
      username: username1,
      cards: deck,
      standard: deckStandard,
      description: deckFlavor,
      cardNum: num
    })
    console.log(Deck)
    setCanCreate(true);
    alert("Ready to create")

  }
  //Get all Decks
  const getAllDecks = () => {
    axios.get('http://localhost:9002/allDecks')
      .then((response) => {
        setDecks(response.data)
        console.log(decks)
        console.log('Data has been received!!');
      })
      .catch((error) => {
        console.log(error)
        alert('Error retrieving data!!!');
      });
  }
  //Gets all decks and filters for decks connected to users id
  const getMyDecks = () => {
    axios.get('http://localhost:9002/allDecks')
      .then((response) => {
        var tempDecks = response.data.filter((deck) => {
          return deck.userId === localStorage.getItem('user')
        })
        setMyDecks(tempDecks)
        console.log(mydecks)
        console.log('Data has been received!!');
      })
      .catch((error) => {
        console.log(error)
        alert('Error retrieving data!!!');
      });
  }
  //Clears deck options
  const clearDeck = () => {
    setDeck([])
    setDeckName("")
    setDeckStandard("")
    setNameFilter("")
    setFilter("")
    setTypeFilter("")
    setNum(0)
    setDeckDescription("")
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Homepage setLoginUser={setLoginUser} user={user} userId={userId1} />
                : <Login setLoginUser={setLoginUser} />
            }
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/home">
            {
              <Homepage setLoginUser={setLoginUser} picture={picture} userId={userId1} />
            }
          </Route>
          <Route path={"/collection"}>
            <div className='pokeFont'>
              <h1 className='center'>Welcome to the Pokemon Collection</h1>
              <Navbar user={picture} userId={userId1} />
              <h2 className='center'>Filters</h2>
              <div className='filters center'>
                <div className='center'>
                  <label>Name: </label> <input type='text' placeholder='name filter'
                    value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
                  <p> </p>
                  <label className='m-2'>Type: </label> <input type='text' placeholder='type filter'
                    value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} />
                  <div class="pagination center mt-2">
                    <button onClick={decreasePageNum} className="btn-sm btn-dark">Previous Page</button>
                    <h3 className='center'>&nbsp; Page: {pageNum} &nbsp; </h3>
                    <button onClick={increasePageNum} className="btn-sm btn-dark">Next Page</button>
                  </div>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary" onClick={getAllPokemon}>Pokemon</button>
                    <button type="button" class="btn btn-secondary" onClick={getAllTrainer}>Trainer</button>
                    <button type="button" class="btn btn-secondary" onClick={getAllEnergy}>Energy</button>
                  </div>
                </div>
              </div>
              <div>
                {
                  isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> :
                    filtered ? <Cards setLoginUser={setLoginUser} card={filteredCards} rawr={getCard} />
                      : <Cards setLoginUser={setLoginUser} card={cards} rawr={getCard} />
                }
              </div>
            </div>
          </Route>
          <Route path="/profile">
            {
              user && user._id ? <Profile user={user} />
                : <Login setLoginUser={setLoginUser} />
            }
          </Route>
          <Route path="/cardInfo">
            <CardInfo card={clickedCard} picture={picture} userId={userId1} />
          </Route>
          <Route path="/createDeck">
            <div className='pokeFont'>
              <h1 className='center'>Create A Deck</h1>
              <Navbar picture={picture} userId={userId1} />
              <div className='filters center'>
                <p></p>
                <p>Number of cards {num}/60</p>
                <p>Note: Update Before Creation</p>
                <div className='center'>
                  <label className='center'>&nbsp; Standard: <input value={deckStandard} placeholder='standard' onChange={(e) => setDeckStandard(e.target.value)}></input></label>
                  <label className='center'>&nbsp; Deck Name: <input placeholder='Deck name' value={deckname} onChange={(e) => setDeckName(e.target.value)}></input></label>
                  <p></p>
                  <label>&nbsp; Name: </label> <input type='text' placeholder='name filter'
                    value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
                  <label className='m-2'>Type: </label> <input type='text' placeholder='type filter'
                    value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} />
                  <p></p>
                  <p className='center'>Deck Description</p>
                  <textarea value={deckFlavor} onChange={(e) => setDeckDescription(e.target.value)}></textarea>
                  <p></p>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary" onClick={getAllPokemon}>Pokemon</button>
                    <button type="button" class="btn btn-secondary" onClick={getAllTrainer}>Trainer</button>
                    <button type="button" class="btn btn-secondary" onClick={getAllEnergy}>Energy</button>
                  </div>
                  <p></p>
                  <p className='center'>
                    <button type="button" class="btn btn-secondary m-2" onClick={clearDeck}>Clear Deck</button>
                    <button type="button" class="btn btn-secondary m-2" onClick={updateDeck}>Update Deck</button>
                    <button type="button" class="btn btn-secondary m-2" onClick={createDeck}>Create Deck</button>
                  </p>
                  <div class="pagination center mt-2">
                    <button onClick={decreasePageNum} className="btn-sm btn-dark">Previous Page</button>
                    <h3 className='center'>&nbsp; Page: {pageNum} &nbsp; </h3>
                    <button onClick={increasePageNum} className="btn-sm btn-dark">Next Page</button>
                  </div>
                </div>
              </div>
              <div>
                {
                  isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> :
                    filtered ? <CreateDeck setLoginUser={setLoginUser} card={filteredCards} rawr={addCardToDeck} user={user} deckname={deckname} deckCards={deck} num={num} />
                      : <CreateDeck setLoginUser={setLoginUser} card={cards} rawr={addCardToDeck} user={userId1} deckname={deckname} deckCard={deck} num={num} />
                }
              </div>
            </div>
          </Route>
          <Route path="/allDecks">
            <div className='pokeFont'>
              {
                isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> :
                  <div>
                    <h1 className='center'>All Decks</h1>
                    <Navbar picture={picture} userId={userId1} />
                    <DeckView decks={decks} rawr={getDeck} />
                  </div>
              }
            </div>
          </Route>
          <Route path='/myDecks'>
            <div className='pokeFont'>
              {
                isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> :
                  <div>
                    <h1 className='center'>My Decks</h1>
                    <Navbar picture={picture} userId={userId1} />
                    <DeckView decks={mydecks} rawr={getDeck} />
                  </div>
              }
            </div>
          </Route>
          <Route path="/deckInfo">
            <div className='pokeFont'>
              <h1 className='center'>Deck Name: {clickedDeck.name}</h1>
              <Navbar picture={picture} userId={userId1} />
              <h1 className='center'>Created By: {clickedDeck.username}</h1>
              <p className='center'>Description: {clickedDeck.description}</p>
              <DeckInfo deck={clickedDeck} />
            </div>
          </Route>
        </Switch>
      </Router>
      <div class="footer">
        <p>@Copyright Julian Enrique Espinoza 2022</p>
      </div>
    </div>
  );
}
export default App;