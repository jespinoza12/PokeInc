import React from "react"
import "./homepage.css"
import Navbar from "../navbar/navbar";
import PostList from "../posts/postList";
const Homepage = ({picture, forums, rawr, posts}) => {

    return (
        <div className="pokeFont">
            <h1 className="center">Welcome to PokeInc</h1>
            <Navbar picture = {picture}/>
            <PostList posts={posts}/>
        </div>
        
    )
}

export default Homepage