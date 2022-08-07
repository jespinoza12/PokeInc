import { React, useEffect, useState } from "react";
import DeckView from "../viewForum/DeckView";
import Comments from "../comments/comments";
import axios from "axios";

const Post = ({posts, rawr}) => {
  
    const [commentList, setComments] = useState([]);
    const [deck, setDeck] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [user, setUser] = useState({
        comment: "",
        fid: localStorage.getItem("post"),
        commenterId: localStorage.getItem("user"),
        commenter: localStorage.getItem("username"),
        likes: 0,
        dislikes: 0,
    });

    useEffect(() => {
        try {
            if (posts.deck[0].name === undefined) {
                setDeck(false);
        } else {
            setDeck(true);
        }
        } catch (e) {
            console.log(e);
        }
    }, [posts.deck]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
        ...user,
        [name]: value,
        });
        console.log(user);
    };

    const addComment = () => {
        const { comment, fid } = user;
        localStorage.setItem("post", posts._id);
        if (comment && fid) {
        axios.post("http://localhost:9002/addC", user).then((res) => {
            alert(res.data.message);
            localStorage.setItem("post", posts._id);
        });
        } else {
        alert("invlid input");
        }
    };

    const getComments = () => {
        axios
        .get("http://localhost:9002/allC")
        .then((response) => {
            var tempDecks = response.data.filter((comment) => {
            return comment.fid === localStorage.getItem("post");
            });
            setComments(tempDecks);
        })
        .catch((error) => {
            console.log(error);
            alert("Error retrieving data!!!");
            alert(error);
        });
    };

    return (
        <div className="postBox center-1">
            <div className="center bg-dark text-light">
            <h1 className="center">{posts.caption}</h1>
            <p className="center m-2">{posts.hashtags}</p>
            {deck ? <DeckView decks={posts.deck} rawr={rawr} /> : "No Deck"}
            <p>Posted by: {posts.username}</p>
            <p>Date: {posts.created}</p>
        <div className="center-1 center ">
            <h2>Comments</h2>
            <label className="center">Comment:</label>
            <p></p>
            <textarea
            onChange={handleChange}
            name="comment"
            value={user.comment}
            ></textarea>
            <p></p>
            <button className="btn btn-dark" onClick={addComment}>
            Create Comment
            </button>
            <p></p>
            <button className="btn btn-dark" onClick={getComments}>
            View Comments/Update
            </button>
            <div className="forumBox center-1 " >
            <Comments comments={commentList}  />
            </div>
        </div>
        </div>
        </div>
    );}

export default Post