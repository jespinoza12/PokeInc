import React from 'react';
import Homepage from "./components/homepage/homepage"
import "bootstrap/dist/css/bootstrap.min.css";
import Forums from "./components/viewForum/Forums"
import EditDeck from "./components/editDeck/Deck"
import UserList from './components/allUsers/UserList';
import Forum from "./components/createForum/forum"
import Login from "./components/login/login"
import Register from "./components/register/register"
import Cards from "./components/Cards/Cards"
import DeckInfo from './components/DeckInfo/deckInfo';
import CardInfo from "./components/cardInfo/CardInfo"
import CreateDeck from "./components/deckCreation/Deck"
import Profile from "./components/profile/profile"
import DeckView from './components/DeckView/DeckView'
import DeckView1 from './components/DeckView/MyDeckView'
import ForumInfo from './components/viewForum/forumInfo';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import pokemon from 'pokemontcgsdk'
import Navbar from './components/navbar/navbar';
import logo from './images/gif.gif'
import axios from "axios"
import Alert from 'react-bootstrap/Alert';
import CreatePost from './components/posts/createPost';
import PostList from './components/posts/postList';
function App() {
  //State Variable
  const [users, setUsers] = useState([])
  const [fusers, setfUsers] = useState([])
  const [editCheck, setEditCheck] = useState(false)
  const [postNameFilter, setPostNameFilter] = useState("")
  const [user, setLoginUser] = useState({})
  const [clickedUser, setClickedUser] = useState([])
  const [varient, setVarient] = useState("info")
  const [i, setI] = useState(0)
  const [check, setCheck] = useState(false)
  const [message, setMessage] = useState("")
  const [hidden, setHidden] = useState(true)
  const [viewDeck, setViewDeck] = useState(false)
  const [comments, setComments] = useState({})
  const [forums, setForums] = useState([])
  const [myforums, setMyForums] = useState([])
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
  const [clickedForum, setClickForum] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [Deck, setDeck1] = useState({});
  const [posts, setPosts] = useState([])
  const [usersPosts, setUPosts] = useState([])
  const [myPosts, setMyPosts] = useState([])
  const [userFilter, setUserFilter] = useState("")
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
      updateDeck()
      getClickedUserPost()
      getPosts()
      getAllUsers()
      getMyForums()
      getComments()
      getForums()
      getAllDecks()
      getMyDecks()
      getData()
      getFilteredCards()
      getCardsByType()
    }
    setEditCheck(false)
    getPosts()
    getComments()
    setUserId(localStorage.getItem('user'))
    setUsername(localStorage.getItem('username'))
    setPicture(localStorage.getItem('picture'))
    //eslint-disable-next-line
  }, [pageNum], [], [user], [comments]);
  useEffect(() => {
    getPosts()
    setUserId(localStorage.getItem('user'))
    setUsername(localStorage.getItem('username'))
    setPicture(localStorage.getItem('picture'))
    //eslint-disable-next-line
  }, [user]);
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
  //Post Filter
  useEffect(() => {
    console.log(`Post Filter: ${[postNameFilter]}`)
    if (postNameFilter === "") {
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
    //eslint-disable-next-line
  }, [postNameFilter]);
  useEffect(() => {
    getClickedUserPost()
    //eslint-disable-next-line
  }, [clickedUser]);
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
    //eslint-disable-next-line
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
    //eslint-disable-next-line
  }, [typeFilter]);
  useEffect(() => {
    console.log(`Username: ${userFilter}`)
    if (userFilter === "") {
      setFiltered(false);
      getAllUsers()
    } else {
      filterUsers()
      setFiltered(true);
    }
    //eslint-disable-next-line
  }, [userFilter]);
  useEffect(() => {
    console.log(`DeckName: ${deckname}`)
  }, [deckname]);
  useEffect(() => {
    console.log(`PageNum: ${pageNum}`)

  }, [pageNum]);
  useEffect(() => {
    console.log(`Standard: ${deckStandard}`)
  }, [deckStandard]);
  useEffect(() => {
    if (editCheck === false){
      updateDeck()
    }else if (editCheck === true){
      updateDeck1()
    }
  }, [editCheck]);
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
      setI(i + 1)
      setDeck(current => [...current, { _id: i, card }]);
      console.log(deck)
      setCanCreate(false)
      setHidden(false)
      setMessage("Card Added")
      setVarient("success")
      setNum(num + 1)
    }
  }
  const deleteCardFromDeck = (cardId) => {
    if (num < 0) {
      alert("You have no cards")
      setNum(0)
    } else {
      setDeck(current =>
        current.filter(card => {
          setNum(num - 1)
          return card._id !== cardId;
        }),

      );
      setHidden(true)
      setVarient("danger")
      setMessage("Card Deleted")
      setNum(num - 1)
      console.log(deck)
    }
  }
  //Creates Deck
  const createDeck = () => {
    console.log(Deck)
    if (canCreate === true) {
      axios.post("http://localhost:9002/createDeck", Deck)
        .then(res => {
          setMessage(res.data.message)
          setHidden(false)
        })
      setCanCreate(false)
    } else {
      setMessage("Update First")
      setHidden(false)
    }
  }
  const editDeck = () => {
    console.log(Deck)
    if (canCreate === true) {
      axios.post("http://localhost:9002/editDeck", Deck)
        .then(res => {
          setMessage(res.data.message)
          setHidden(false)
        })
      setCanCreate(false)
    } else {
      setMessage("Update First")
      setHidden(false)
    }
  }

  //Gets Selected User
  const getUser = (user) => {
    setClickedUser(user)
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
    setMessage("Deck Updated")
    setVarient("success")
    setHidden(false)
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
    setMessage("Deck Cleared")
    setHidden(false)
  }
  const getForums = () => {
    setLoading(true)
    axios.get('http://localhost:9002/allForums')
      .then((response) => {
        setForums(response.data)
        console.log(forums)
        console.log('Data has been received!!');
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        alert('Error retrieving data!!!');
        setLoading(false)
      });
  }
  const setForum = (forum) => {
    setClickForum(forum)
  }
  const getComments = () => {
    setLoading(true)

    axios.get('http://localhost:9002/allC')
      .then((response) => {
        var tempDecks = response.data.filter((comment) => {
          return comment.fid === localStorage.getItem('forum')
        })
        setComments(tempDecks)
        console.log('Data has been received!!');
        console.log(comments);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        alert('Error retrieving data!!!');
        alert(error)
        setLoading(false)
      });
  }
  const getMyForums = () => {
    setLoading(true)

    axios.get('http://localhost:9002/allForums')
      .then((response) => {
        var tempDecks = response.data.filter((forum) => {
          return forum.authorId === localStorage.getItem('user')
        })
        setMyForums(tempDecks)
        console.log('Data has been received!!');
        console.log(myforums);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        console.log('Error retrieving data!!!');
        console(error)
        setLoading(false)
      });
  }
  const changeCards = () => {
    if (canCreate === true) {
      if (viewDeck === false) {
        updateDeck()
        setVarient("info")
        setCards([])
        setViewDeck(true)
        setFilteredCards(deck)
        setHidden(true)
        setCards(deck)
        setCheck(true)
      } else if (viewDeck === true) {
        setVarient("info")
        updateDeck()
        setCards([])
        setHidden(false)
        setFilteredCards([])
        setViewDeck(false)
        getData()
        setCheck(false)
      }
    } else {
      setMessage("Update First")
      setVarient("danger")
    }
  }
  const getPosts = () => {
    axios.get('http://localhost:9002/allPosts')
      .then((response) => {
        setPosts(response.data)
        var tempPosts = response.data.filter((post) => {
          return post.authorId === localStorage.getItem('user')
        })
        setMyPosts(tempPosts)
        console.log(posts)
        console.log('Data has been received!!');
      })
      .catch((error) => {
        console.log(error)
        console.log('Error retrieving data!!!');
      });
  }
  const getAllUsers = () => {
    axios.get('http://localhost:9002/allUsers')
      .then((response) => {
        setUsers(response.data)
        console.log(response.data)
        console.log('Data has been received!!');
      })
      .catch((error) => {
        console.log(error)
        console.log('Error retrieving data!!!');
      });
  }
  const filterUsers = () => {
    axios.get('http://localhost:9002/allUsers')
      .then((response) => {
        var tempUsers = response.data.filter((user) => {
          return user.username.toLowerCase().includes(userFilter.toLowerCase())
        })
        setfUsers(tempUsers)
        console.log(tempUsers)
        console.log('Data has been received!!');
      })
      .catch((error) => {
        console.log(error)
        console.log('Error retrieving data!!!');
      });
  }
  const getClickedUserPost = () => {
    setLoading(true)
    axios.get('http://localhost:9002/allPosts')
      .then((response) => {
        var tempPosts = response.data.filter((post) => {
          return post.authorId === clickedUser._id
        })
        setUPosts(tempPosts)
        console.log(tempPosts)
        console.log('Data has been received!!');
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
        console.log('Error retrieving data!!!');
      });
  }
  const updateDeck1 = () => {
    setNum(parseInt(clickedDeck.cardNum))
    setDeckName(clickedDeck.name)
    setDeckStandard(clickedDeck.standard)
    setDeckDescription(clickedDeck.description)
    setDeck(clickedDeck.cards)
  }
  
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/PokeInc/">
            {
              user && user._id ? <Homepage setLoginUser={setLoginUser} user={user} userId={userId1} posts={posts} rawr={getDeck} />
                : <Login setLoginUser={setLoginUser} />
            }
          </Route>
          <Route path="/PokeInc/login">
            <Login setLoginUser={setLoginUser} rawr={getForums} />
          </Route>
          <Route path="/PokeInc/register">
            <Register />
          </Route>
          <Route path="/PokeInc/home">
            {
              <div>
                {
                  isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> : <Homepage setLoginUser={setLoginUser} picture={picture} userId={userId1} posts={posts} rawr={getDeck} />
                }
              </div>
            }
          </Route>
          <Route path={"/PokeInc/collection"}>
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
                    <h3 className='center '>&nbsp; Page: <input className='inputSize' type='text' placeholder=''
                    value={pageNum} onChange={(e) => setPageNum(e.target.value)} /> &nbsp; </h3>
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
          <Route path="/PokeInc/profile">
            {
              user && user._id ? <Profile user={user} />
                : <Login setLoginUser={setLoginUser} />
            }
          </Route>
          <Route path="/PokeInc/cardInfo">
            <CardInfo card={clickedCard} picture={picture} userId={userId1} />
          </Route>
          <Route path="/PokeInc/createDeck">
            <div className='pokeFont'>
              <Navbar picture={picture} userId={userId1} />
              <Alert key={varient} variant={varient} hidden={hidden} className="center fixed-bottom width " onClose={() => setHidden(true)} dismissible>
                {message}
              </Alert>
              <h1 className='center'>Create A Deck</h1>
              <div className='filters center'>
                <p></p>
                <p>Number of cards {num}/60</p>
                <p>Note: Update Before Creation</p>
                <div className='center'>
                  <label className='center'>&nbsp; Standard: 
                    <select className='.custom-select' value={deckStandard} onChange={(e) => setDeckStandard(e.target.value)} >
                      <option>Standard</option>
                      <option>Expanded</option>
                      <option>Legacy</option>
                      <option>Unlimited</option>
                    </select>
                  </label>
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
                  <button onClick={changeCards} className="btn-sm btn-dark">View/Hide Deck</button>
                </div>
              </div>
              <div>
                {
                  isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> :
                    filtered ? <CreateDeck setLoginUser={setLoginUser} check={check} card={filteredCards} rawr={addCardToDeck} rawr2={deleteCardFromDeck} user={user} deckname={deckname} deckCards={deck} num={num} />
                      : <CreateDeck setLoginUser={setLoginUser} card={cards} check={check} rawr={addCardToDeck} user={userId1} rawr2={deleteCardFromDeck} deckname={deckname} deckCard={deck} num={num} />
                }
              </div>
            </div>
          </Route>
          <Route path="/PokeInc/allDecks">
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
          <Route path='/PokeInc/myDecks'>
            <div className='pokeFont'>
              {
                isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> :
                  <div>
                    <h1 className='center'>My Decks</h1>
                    <Navbar picture={picture} userId={userId1} />
                    <DeckView1 decks={mydecks} rawr={getDeck} rawr2={updateDeck1} edit = {setEditCheck}/>
                  </div>
              }
            </div>
          </Route>
          <Route path="/PokeInc/deckInfo">
            <div className='pokeFont'>
              <h1 className='center'>Deck Name: {clickedDeck.name}</h1>
              <Navbar picture={picture} userId={userId1} />
              <h1 className='center'>Created By: {clickedDeck.username}</h1>
              <p className='center'>Description: {clickedDeck.description}</p>
              <DeckInfo deck={clickedDeck} />
            </div>
          </Route>
          <Route path="/PokeInc/createForum">
            <div className='pokeFont'>
              {
                isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> :
                  <div>
                    <Forum decks={mydecks} rawr={getDeck} sdeck={clickedDeck} />
                  </div>
              }
            </div>
          </Route>
          <Route path="/PokeInc/forumInfo">
            <div className='pokeFont'>
              <Navbar />
              {
                isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> : <ForumInfo forum={clickedForum} rawr={getDeck} comments={comments} />
              }

            </div>
          </Route>
          <Route path="/PokeInc/allForums">
            <div className='pokeFont'>
              <Navbar />
              {
                isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> : <Forums forums={forums} rawr={setForum} myforum={false} />
              }
            </div>
          </Route>
          <Route path="/PokeInc/myForums">
            <div className='pokeFont'>
              <Navbar />
              {
                isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> : <Forums forums={myforums} rawr={setForum} myforum={true} />
              }
            </div>
          </Route>
          <Route path="/PokeInc/createPost">
            <div className='pokeFont'>
              {
                isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> :
                  <div>
                    <CreatePost decks={decks} rawr={getDeck} sdeck={clickedDeck} />
                  </div>
              }
            </div>
          </Route>
          <Route path="/PokeInc/myPage">
            <div className='pokeFont'>
              <h1 className='center'>Welcome, {localStorage.getItem('username')}</h1>
              <Navbar />
              <PostList posts={myPosts} rawr = {getDeck}/>
            </div>
          </Route>
          <Route path="/PokeInc/editDeck">
            <div className='pokeFont'>
                <Navbar picture={picture} userId={userId1} />
                <Alert key={varient} variant={varient} hidden={hidden} className="center fixed-bottom width " onClose={() => setHidden(true)} dismissible>
                  {message}
                </Alert>
                <h1 className='center'>Edit {clickedDeck.name}</h1>
                <div className='filters center'>
                  <p></p>
                  <p>Number of cards {num}/60</p>
                  <p>Note: Update Before Creation</p>
                  <div className='center'>
                  <label className='center'>&nbsp; Standard: 
                    <select value={deckStandard} onChange={(e) => setDeckStandard(e.target.value)} >
                      <option>Standard</option>
                      <option>Expanded</option>
                      <option>Legacy</option>
                      <option>Unlimited</option>
                    </select>
                  </label>                    
                  <label className='center'  hidden={hidden}>&nbsp; Deck Name: <input placeholder='Deck name' value={deckname} onChange={(e) => setDeckName(e.target.value)}></input></label>
                    <p></p>
                    <label  hidden={hidden}>&nbsp; Name: </label> <input  hidden={hidden} type='text' placeholder='name filter'
                      value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
                    <label  hidden={hidden} className='m-2'>Type: </label> <input type='text'  hidden={hidden} placeholder='type filter'
                      value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} />
                    <p></p>
                    <p className='center'>Deck Description</p>
                    <textarea value={deckFlavor} onChange={(e) => setDeckDescription(e.target.value)}></textarea>
                    <p></p>
                    <div class="btn-group" role="group" aria-label="Basic example"  hidden={hidden}>
                      <button type="button" class="btn btn-secondary" onClick={getAllPokemon}>Pokemon</button>
                      <button type="button" class="btn btn-secondary" onClick={getAllTrainer}>Trainer</button>
                      <button type="button" class="btn btn-secondary" onClick={getAllEnergy}>Energy</button>
                    </div>
                    <p></p>
                    <p className='center'>
                      <button type="button" class="btn btn-secondary m-2" onClick={clearDeck}>Clear Deck</button>
                      <button type="button" class="btn btn-secondary m-2" onClick={updateDeck}>Update Deck</button>
                      <button type="button" class="btn btn-secondary m-2" onClick={editDeck}>Finish Editing</button>
                    </p>
                    <div class="pagination center mt-2" hidden={hidden}>
                      <button onClick={decreasePageNum} className="btn-sm btn-dark">Previous Page</button>
                      <h3 className='center'>&nbsp; Page: {pageNum} &nbsp; </h3>
                      <button onClick={increasePageNum} className="btn-sm btn-dark">Next Page</button>
                    </div>
                    <button onClick={changeCards} className="btn-sm btn-dark">View/Hide Deck</button>
                  </div>
                </div>
                <div>
                  {
                    isLoading ? <img className='pokeBall center-1' src={logo} alt="loading..." /> :
                      filtered ? <EditDeck setLoginUser={setLoginUser} check={check} card={filteredCards} rawr={addCardToDeck} rawr2={deleteCardFromDeck} user={user} deckname={deckname} deckCards={deck} num={num} />
                        : <EditDeck setLoginUser={setLoginUser} card={cards} check={check} rawr={addCardToDeck} user={userId1} rawr2={deleteCardFromDeck} deckname={deckname} deckCard={deck} num={num} />
                  }
                </div>
              </div>
          </Route>
          <Route path="/PokeInc/allUsers">
            <div className='pokeFont'>
              <Navbar/>
              <input className='center-1' placeholder='search by username' name="userFilter" onChange={(e) => setUserFilter(e.target.value)} ></input>
              {
                filtered ? <UserList users={fusers} rawr = {getUser}  rawr2 = {getClickedUserPost}/> : <UserList users={users} rawr = {getUser} rawr2 = {getClickedUserPost}/>
              }
            </div>
          </Route>
          <Route path="/PokeInc/usersPage">
            <div className='pokeFont'>
              <h1 className='center'>Welcome, to {clickedUser.username}'s page</h1>
              <Navbar />
              {
                isLoading ?  <img className='pokeBall center-1' src={logo} alt="loading..." /> : <PostList posts={usersPosts} rawr = {getDeck} />
              }
         
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