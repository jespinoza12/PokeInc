import './App.css'
import React from 'react';
import Homepage from "./components/homepage/homepage"
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login"
import Register from "./components/register/register"
import Cards from "./components/Cards/Cards"
import CardInfo from "./components/Cards/CardInfo"
import Profile from "./components/profile/profile"
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import pokemon from 'pokemontcgsdk'
// import Colorless from './images/Colorless-attack.png'
// import Dark from './images/Darkness-attack.png'
// import Fighting from './images/Fighting-attack.png'
// import Fire from './images/Fire-attack.png'
// import Grass from './images/Grass-attack.png'
// import Electric from './images/Lightning-attack.png'
// import Steel from './images/Metal-attack.png'
// import Psychic from './images/Psychic-attack.png'
// import Water from './images/Water-attack.png'
import Navbar from './components/navbar/navbar';

function App() {

  //State Variable
  const [user, setLoginUser] = useState({})
  const [cards, setCards] = useState([])
  const [filtered, setFiltered] = useState(false);
  const [filteredCards, setFilteredCards] = useState([])
  const [pageNum, setPageNum] = useState(1)


  //Filters
  const [typeFilter, setTypeFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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
    setPageNum(decreasedPageNum)
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
    }else{
      getCardsByType();
      setPageNum(1)
      setFiltered(true);
      console.log(cards)
    }

  }, [typeFilter]);


  const getData = () => {
    pokemon.card.where({pageSize: 50, page: pageNum })
    .then(data =>  {
      setCards(data.data)
      console.log(data.data)
    })
  }

  const getFilteredCards = () => {
    pokemon.card.where({ q: "name:" + nameFilter.toLowerCase(), pageSize: 50, page: pageNum  })
    .then(result => {
    setFilteredCards(result.data)
    console.log(result.data)

  })
  }

  const getCardsByType = () => {
    pokemon.card.where({ q: "types:" + typeFilter.toLowerCase(), pageSize: 50, page: pageNum})
    .then(result => {
    console.log(result.data)
    setFilteredCards(result.data)
  })
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
            <h1 className='center'>Welcome to the Pokemon Collection</h1>
            <Navbar/>
            <div class="pagination">
              <button onClick={decreasePageNum}>Previous Page</button>
              <button onClick={increasePageNum}>Next Page</button>
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
            {/* <div class="center">
              <img id='1' src={Colorless} onClick={clickHandler}/>
              <img id='2' src={Grass} onClick={clickHandler}/>
              <img id='3' src={Fire} onClick={clickHandler}/>
              <img id='4' src={Electric} onClick={clickHandler}/>
              <img id='5' src={Fighting} onClick={clickHandler}/>
              <img id='6' src={Dark} onClick={clickHandler}/>
              <img id='7' src={Water} onClick={clickHandler}/>
              <img id='8' src={Steel} onClick={clickHandler}/>
              <img id='9' src={Psychic} onClick={clickHandler}/>
              <button onClick={clearFilters}>Clear Filters</button>
            </div> */}
            </div>
            <div>
            {
             filtered ? <Cards setLoginUser={setLoginUser} card = {filteredCards}/> : <Cards setLoginUser={setLoginUser} card = {cards}/> 
            }
            </div>
            
          </Route>
          <Route path="/profile">
          {
              user && user._id ? <Profile user = {user}/>
              : <Login setLoginUser={setLoginUser}/>
            }
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
