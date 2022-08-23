import express from "express"
import cors from "cors"
import mongoose from "mongoose"
const path = require('path')
const port = process.env.PORT || 5000

const app = express()
//Misc
app.use(express.static(path.join(__dirname, 'build')))

app.use(express.json({limit: '100mb', extended: true}))
app.use(express.urlencoded({limit: '100mb', extended: true}))
app.use(cors())


//Mongoose Connection
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb+srv://Frosty:7piercerS@pokecluster.fec6buu.mongodb.net/user?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

//Schemas
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    picture: String,

})
const deckSchema = new mongoose.Schema({
    name: String,
    username:String,
    userId: String, 
    cards: [], 
    standard: String, 
    description: String,
    cardNum: String,
})
const forumSchema = new mongoose.Schema({
    name: String,
    authorId: String, 
    username: String,
    created: String,
    deck: [],
    content: String,
    comments: [{
        comment:{type: String},
        commenter:{type:String},
        commenterId:{type:String},
    }],
})
const commentSchema = new mongoose.Schema({
        fid:String,
        comment:String,
        commenter:String,
        commenterId:String,
        likes:Number,
        dislikes:Number,
})
const postSchema = new mongoose.Schema({
    deck: [],
    authorId: String, 
    caption: String,
    hashtags: String, 
    username: String, 
    comments: [{
        comment:{type: String},
        commenter:{type:String},
        commenterId:{type:String},
    }],
    created: String,
})

//Collections
const User = new mongoose.model("User", userSchema)
const Deck = new mongoose.model("Decks", deckSchema)
const Forum = new mongoose.model("Forum", forumSchema)
const Comments =  new mongoose.model("Comments", commentSchema)
const Posts =  new mongoose.model("Post", postSchema)

//Posts
app.get('/backend/allPosts', (req, res) => {
    Posts.find({})
    .then((data) => {
        // console.log('All Posts: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
})
app.post('/backend/createPost', (req, res) => {
    const {caption, authorId, username, created, deck, hashtags} = req.body
    Forum.findOne({caption:caption, authorId: authorId}, (err, post) => {
        if(post){
            res.send({message: "You already have a forum named this"})
        } else {
            const post1 = new Posts({
                        caption,
                        username,
                        authorId,
                        deck,
                        created,
                        hashtags,
                    })
            post1.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Created." })
                }
            })
        }
    })
})

//Comment
app.post("/backend/like", (req, res) => {
    const {id, likes} = req.body
    const increased =  likes + 1
    Comments.findByIdAndUpdate({ _id: id }, { likes: increased }, function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send("Thanks for the feedback")
        }
    })
});
app.post("/backend/dislike", (req, res) => {
    const {id, dislikes} = req.body
    const decreased =  dislikes + 1
    Comments.findByIdAndUpdate({ _id: id }, { dislikes: decreased }, function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send("Thanks for the Feedback")
        }
    })
});
app.get('/backend/allC', (req, res) => {
    Comments.find({})
    .then((data) => {
        // console.log('All Comments: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
})
app.post('/backend/addC', (req, res) => {
    const {fid, commenterId, commenter, comment, likes, dislikes} = req.body
    Comments.find({}, (err) => {
            const comment1 = new Comments({
                        fid: fid,
                        comment: comment,
                        commenter: commenter, 
                        commenterId: commenterId,
                        likes: likes,
                        dislikes: dislikes,
                    })
            comment1.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Created." })
                }
            })
    })
})

//Edit


//Forums
app.get('/backend/allForums', (req, res) => {
    Forum.find({})
    .then((data) => {
        // console.log('All Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
})
app.post('/backend/createForum', (req, res) => {
    const {name, authorId, username, created, deck, content} = req.body
    Forum.findOne({name:name, authorId: authorId}, (err, forum) => {
        if(forum){
            res.send({message: "You already have a forum named this"})
        } else {
            const forum = new Forum({
                        name,
                        username,
                        authorId,
                        deck,
                        created,
                        content,
                    })
            forum.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Created." })
                }
            })
        }
    })
})
app.post("/backend/deleteForum", (req, res) => {
    const {forumId} = req.body
    Forum.findOne({_id: forumId}, (err, forum) => {
        if (forum){
            forum.delete()
            console.log("Deleted")
            res.send({message: "Deleted"})
        }else {
            console.log("Oops" + err)
        }
    })
}) 

//Decks
app.get('/backend/allDecks', (req, res) => {
    Deck.find({})
    .then((data) => {
        // console.log('All Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
})
app.post("/backend/deleteDeck", (req, res) => {
    const {deckId} = req.body
    Deck.findOne({_id: deckId}, (err, deck) => {
        if (deck){
            deck.delete()
            console.log("Deleted")
            res.send({message: "Deleted"})
        }else {
            console.log("Oops" + err)
        }
    })
}) 
app.post("/backend/createDeck", (req, res) => {
    const { name, userId, cards, username, description, standard, cardNum } = req.body
    Deck.findOne({name:name, userId:userId}, (err, deck) => {
        if (name === "" || description === "" || standard === ""){
            res.send({message: "You either have no name, description or standard"})
        }else {
            const deck = new Deck({
                        name,
                        username,
                        userId,
                        cards,
                        standard,
                        description,
                        cardNum
                    })
            deck.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Created." })
                }
            })
        }
    })
})        
app.post("/backend/editDeck", (req, res) => {
    const {name, userId, cards, username, description, standard, cardNum } = req.body
    Deck.findOneAndUpdate({ userId: userId, name:name }, { name: name, username: username, userId: userId, cards:cards, description: description, standard: standard, cardNum: cardNum }, function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send("Update Complete")
        }
    })
        
});
//Edit User
app.post("/backend/edit", (req, res) => {
    const {id, username, name, email, password, picture} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "Email Already Exists"})
        }else if (username.length > 12){
            res.send({message: "Username can only be 12 characters"})
        }else {
            User.findByIdAndUpdate({ _id: id }, { name: name, username: username, password: password, email: email, picture: picture }, function (err, result) {
                if (err) {
                    res.send(err)
                } else {
                    res.send("Update Complete")
                }
            })
        }
    })
});
//All Users
app.get('/backend/allUsers', (req, res) => {
    User.find({})
    .then((data) => {
        // console.log('All Users: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
})
//Login & Register
app.post("/backend/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 
app.post("/backend/register", (req, res)=> {
    const { name, email, password, username} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "Email Already Exists"})
        }else if (username.length > 12){
            res.send({message: "Username can only be 12 characters"})
        } else {
            const user = new User({
                name,
                username,
                email,
                password,
                picture: 'https://w7.pngwing.com/pngs/589/83/png-transparent-account-avatar-contact-people-profile-user-basic-icon.png'
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 
//Listining at LocalHost:9002
app.listen(9002,() => {
    console.log("BE started at port 9002")
})