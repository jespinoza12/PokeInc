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
import Navbar from './components/navbar/navbar';




function App() {

  const [user, setLoginUser] = useState({})
  const [cards, setCards] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [nameFilter, setNameFilter] = useState('')

  pokemon.configure({apiKey: 'ca37f52b-e2ad-4d7c-885a-2ddd6838eb63'})
  
  useEffect(() => {
    getData()
  }, [pageNum]);

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
    var tempCards = cards.filter((card) => { 
      return card.name.toLowerCase().includes(nameFilter.toLowerCase())
      }
    );

    if (nameFilter == ""){
      getData()
    }else{
      setCards(tempCards);
    }

  }, [nameFilter]);


  const getData = () => {
    pokemon.card.where({pageSize: 50, page: pageNum })
    .then(data =>  {
      //Page 1 in the Api
      setCards(data.data)
      console.log(data.data)
      console.log(cards)
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
            <div className='filters'>
              <div className='center'>
                <label>Name: </label>
                <input type='text' placeholder='name filter'
                value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
            </div>
            </div>
             <Cards setLoginUser={setLoginUser} card = {cards}/> 
            
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
