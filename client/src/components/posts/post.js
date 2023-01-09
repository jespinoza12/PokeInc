import { React, useEffect, useState } from "react";
import DeckView from "../viewForum/DeckView"
import Comments from "../comments/comments";
import axios from "axios";

const Post = ({posts, rawr}) => {
  
    const [commentList, setComments] = useState([]);
    const [check, setCheck] = useState(false)
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

    useEffect(() => {
        setUser({
            comment: user.comment,
            fid: "",
            commenterId: localStorage.getItem("user"),
            commenter: localStorage.getItem("username"),
            likes: user.likes,
            dislikes: user.dislikes,
        });
    }, []);

    const update = (e) => {
        setUser({
            comment: user.comment,
            fid: localStorage.getItem("post"),
            commenterId: localStorage.getItem("user"),
            commenter: localStorage.getItem("username"),
            likes: 0,
            dislikes: 0,
        });
        setCheck(true)
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
        ...user,
        [name]: value,
        });
        setCheck(false)
        localStorage.setItem("post", posts._id);
    };

    const addComment = () => {
        const { comment, fid } = user;
        localStorage.setItem("post", posts._id);
        if (comment.length <= 280) {
            axios.post("https://poke-inc.herokuapp.com/backend/addC", user).then((res) => {
                alert(res.data.message);
                localStorage.setItem("post", posts._id);
            });
        } else {
            alert("Can only have 280 characters");
        }
    };

    const getComments = () => {
        localStorage.setItem("post", posts._id);
        axios
        .get("https://poke-inc.herokuapp.com/backend/allC")
        .then((response) => {
            var tempDecks = response.data.filter((comment) => {
            return comment.fid === localStorage.getItem("post");
            });
            setComments(tempDecks);
            if (hidden === true){
                setHidden(false)
            }else if (hidden === false){
                setHidden(true)
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Error retrieving data!!!");
            alert(error);
        });
    };
    const getComments1 = () => {
        localStorage.setItem("post", posts._id);
        axios
        .get("https://poke-inc.herokuapp.com/backend/allC")
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
        <div className="postBox center-1 text-break">
            <div className="center bg-dark text-light">
            <h3 className="center">{posts.caption}</h3>
            <p className="center m-2">{posts.hashtags}</p>
            {deck ? <DeckView decks={posts.deck} rawr={rawr} /> : "No Deck"}
            <p>Posted by: {posts.username}</p>
            <p>Date: {posts.created}</p>
        <div className="center-1 center ">
            <p>Comment:</p>
            <textarea
            onChange={handleChange}
            name="comment"
            value={user.comment}
            ></textarea>
            <p></p>
            {
                check ? <button className="btn btn-secondary" onClick={addComment}>Comment</button>: <button className="btn btn-secondary" onClick={update}>Update</button>
            }
            {
                hidden ? <button className="btn btn-secondary" onClick={getComments}>
                View Comments
                </button> : <button className="btn btn-secondary" onClick={getComments}>
                Hide Comments
                </button>
            }
            <div className="forumBox center-1 " >
            <h1>Comments</h1>
            {
                hidden ? "" : <Comments comments={commentList} getComments={getComments1} />
            }
            </div>
        </div>
        </div>
        </div>
    );}

export default Post