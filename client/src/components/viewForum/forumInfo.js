    import { React, useEffect, useState } from "react";
    import DeckView from "./DeckView";
    import Comments from "../comments/comments";
    import "./forum.css";
    import axios from "axios";

    const ForumInfo = ({ forum, rawr, comments }) => {
    const [check, setCheck] = useState(false)
    const [commentList, setComments] = useState([]);
    const [deck, setDeck] = useState(false);
    const [user, setUser] = useState({
        comment: "",
        fid: localStorage.getItem("forum"),
        commenterId: localStorage.getItem("user"),
        commenter: localStorage.getItem("username"),
        likes: 0,
        dislikes: 0,
    });

    useEffect(() => {
        try {
            if (forum.deck[0].name === undefined) {
                setDeck(false);
        } else {
            setDeck(true);
        }
        } catch (e) {
            console.log(e);
        }
    }, [forum.deck]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
        ...user,
        [name]: value,
        });
    };

    const addComment = () => {
        const { comment, fid } = user;
        if (comment.length <= 280 && fid) {
        axios.post("http://localhost:9002/backend/addC", user).then((res) => {
            alert(res.data.message);
            localStorage.setItem("forum", forum._id);
        });
        } else {
            alert("Must only have up to 280 characters");
        }
    };

    const getComments = () => {
        axios
        .get("http://localhost:9002/backend/allC")
        .then((response) => {
            var tempDecks = response.data.filter((comment) => {
            return comment.fid === localStorage.getItem("forum");
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
        <div>
        <div className="forumBox center-1 center ">
            <h1 className="center m-2">{forum.name}</h1>
            <h5>By: {forum.username}</h5>
            <p className="center m-2">{forum.content}</p>
            {deck ? <DeckView decks={forum.deck} rawr={rawr} /> : "No Deck"}
        </div>
        <div className="center-1 center box">
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
            <div className="forumBox center-1">
            <Comments comments={commentList} getComments={getComments} />
            </div>
        </div>
        </div>
    );
    };

    export default ForumInfo;
