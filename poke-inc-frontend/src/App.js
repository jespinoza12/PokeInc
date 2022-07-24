import React from 'react';
import Homepage from "./components/homepage/homepage"
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login"
import Register from "./components/register/register"
import Cards from "./components/Cards/Cards"
import CardInfo from "./components/cardInfo/CardInfo"
import CreateDeck from "./components/deckCreation/Deck"
import Profile from "./components/profile/profile"
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import pokemon from 'pokemontcgsdk'
import Navbar from './components/navbar/navbar';
import logo from './images/gif.gif'
import { useHistory } from "react-router-dom"

function App() {

  //State Variable
  const [user, setLoginUser] = useState({})
  const [cards, setCards] = useState([])
  const [deck, setDeck] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filteredCards, setFilteredCards] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [clickedCard, setCard] = useState([])
  const [isLoading, setLoading] = useState(false);


  //Filters
  const [typeFilter, setTypeFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const history = useHistory()

  pokemon.configure({apiKey: 'ca37f52b-e2ad-4d7c-885a-2ddd6838eb63'})
  
  //Gets data whenever page is changed
  useEffect(() => {
    getData()
    getFilteredCards()
    getCardsByType()
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
    if (decreasedPageNum < 1){
      setPageNum(1)
    }else{
      setPageNum(decreasedPageNum)
    }
  }
  //Name Filter
  useEffect(() => {
    console.log(`Name: ${nameFilter}`)

    if (nameFilter === ""){
      setFiltered(false)
      setPageNum(1)
      getData()
      getFilteredCards()
    }else{
      setPageNum(1)
      setFiltered(true);
      getFilteredCards();
      console.log(cards)
    }

  }, [nameFilter]);
  //Type Filter
  useEffect(() => {
    console.log(`type: ${typeFilter}`)
    
    if (typeFilter === ""){
      setFiltered(false);
      getData()
      setPageNum(1)
    } else{
      getCardsByType();
      setPageNum(1)
      setFiltered(true);
      console.log(cards)
    }

  }, [typeFilter]);
  //Gets Cards
  const getData = () => {
    setLoading(true)
    pokemon.card.where({pageSize: 50, page: pageNum })
    .then(data =>  {
      setLoading(false)
      setCards(data.data)
      console.log(data.data)
    })
  }
  //Gets Filtered Cards
  const getFilteredCards = () => {
    setLoading(true)
    pokemon.card.where({ q: "name:" + nameFilter.toLowerCase(), pageSize: 50, page: pageNum  })
    .then(result => {
    setFilteredCards(result.data)
    setLoading(false)
    console.log(result.data)

  })
  }
  //Gets card by type
  const getCardsByType = () => {
    setLoading(true)
    pokemon.card.where({ q: "types:" + typeFilter.toLowerCase(), pageSize: 50, page: pageNum})
    .then(result => {
      console.log(result.data)
      setLoading(false)
    setFilteredCards(result.data)
  })
  }

  //Rawr for cards
  const getCard = (card) => {
    setCard(card)
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Homepage setLoginUser={setLoginUser} user={user}/>
              : <Login setLoginUser={setLoginUser}/>
            }
          </Route>
          <Route path="/login">
            <Login  setLoginUser={setLoginUser}/>
          </Route>
          <Route path="/register">
            <Register  />
          </Route>
          <Route path="/home">
            {
              <Homepage setLoginUser={setLoginUser} user = {user}/>
            }
          </Route> 
          <Route path={"/collection"}>
            <div className='pokeFont'>
              <h1 className='center'>Welcome to the Pokemon Collection</h1>
              <Navbar user={user.picture}/>
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
                </div>
              </div>
              <div>
              {
                isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..."/> : 
                filtered ? <Cards setLoginUser={setLoginUser} card = {filteredCards} rawr = {getCard}/> 
                : <Cards setLoginUser={setLoginUser} card = {cards} rawr={getCard}/> 
              }
              </div>
            </div>
          </Route>
          <Route path="/profile">
          {
              user && user._id ? <Profile user = {user}/>
              : <Login setLoginUser={setLoginUser}/>
            }
          </Route>
          <Route path="/cardInfo">
            <CardInfo card={clickedCard}/>
          </Route> 
          <Route path="/createDeck">
            <div className='pokeFont'>
                <h1 className='center'>Create A Deck</h1>
                <Navbar user={user.picture}/>
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
                  </div>
                </div>
                <div>
                {
                  isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..."/> : 
                  filtered ? <CreateDeck setLoginUser={setLoginUser} card = {filteredCards} rawr = {getCard}/> 
                  : <CreateDeck setLoginUser={setLoginUser} card = {cards} rawr={getCard}/> 
                }
                </div>
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
