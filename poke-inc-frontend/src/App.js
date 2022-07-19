import React from 'react';
import Homepage from "./components/homepage/homepage"
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login"
import Register from "./components/register/register"
import Cards from "./components/Cards/Cards"
import CardInfo from "./components/cardInfo/CardInfo"
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
  


  useEffect(() => {
    getData()
    getFilteredCards()
    getCardsByType()
  }, [pageNum], []);

  const increasePageNum = () => {
    const increasedPageNum = pageNum + 1
    setPageNum(increasedPageNum)
    console.log(pageNum)
  }
  const decreasePageNum = () => {
    const decreasedPageNum = pageNum - 1
    if (decreasedPageNum < 1){
      setPageNum(1)
    }else{
      setPageNum(decreasedPageNum)
    }
  }

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


  const getData = () => {
    setLoading(true)
    pokemon.card.where({pageSize: 50, page: pageNum })
    .then(data =>  {
      setLoading(false)
      setCards(data.data)
      console.log(data.data)
    })
  }

  const getFilteredCards = () => {
    setLoading(true)
    pokemon.card.where({ q: "name:" + nameFilter.toLowerCase(), pageSize: 50, page: pageNum  })
    .then(result => {
    setFilteredCards(result.data)
    setLoading(false)
    console.log(result.data)

  })
  }

  const getCardsByType = () => {
    setLoading(true)
    pokemon.card.where({ q: "types:" + typeFilter.toLowerCase(), pageSize: 50, page: pageNum})
    .then(result => {
      console.log(result.data)
      setLoading(false)
    setFilteredCards(result.data)
  })
  }

 

  const getCard = (card) => {
    setCard(card)
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Homepage setLoginUser={setLoginUser}/>
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
              <Homepage setLoginUser={setLoginUser}/>
            }
          </Route> 
          <Route path={"/collection"}>
            <div className='pokeFont'>
              <h1 className='center'>Welcome to the Pokemon Collection</h1>
              <Navbar/>
              <div class="pagination">
                <button onClick={decreasePageNum} className="btn btn-dark">Previous Page</button>
                <h2 className='center'>Page: {pageNum} </h2>
                <button onClick={increasePageNum} className="btn btn-dark">Next Page</button>
              </div>
              <h2 className='center'>Filters</h2>
              <div className='filters center'>
                <div className='center'>
                  <label>Name: </label> <input type='text' placeholder='name filter'
                  value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
                  <p> </p>
                  <label>Type: </label> <input type='text' placeholder='type filter'
                  value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} />
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
        </Switch>
      </Router>
      <div class="footer">
        <p>@Copyright Julian Enrique Espinoza 2022</p>
      </div>
    </div>
  );
}

export default App;
