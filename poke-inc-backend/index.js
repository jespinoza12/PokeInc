import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb+srv://Frosty:7piercerS@pokecluster.fec6buu.mongodb.net/user?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

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

const User = new mongoose.model("User", userSchema)
const Deck = new mongoose.model("Decks", deckSchema)
const UserId = ""



app.get('/allDecks', (req, res) => {
    Deck.find({})
    .then((data) => {
        console.log('All Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
})

app.post("/createDeck", (req, res) => {
    const { name, userId, cards, username, description, standard, cardNum } = req.body
    Deck.findOne({name:name, userId:userId}, (err, deck) => {
        if(deck){
            res.send({message: "You already have a deck named this"})
        } else {
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


app.post("/edit", (req, res) => {
    const {id, username, name, email, password, picture} = req.body
    User.findByIdAndUpdate({ _id: id }, { name: name, username: username, password: password, email: email, picture: picture }, function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send("Update Complete")
        }
    })
        
});

//Routes 
app.post("/login", (req, res)=> {
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

app.post("/register", (req, res)=> {
    const { name, email, password, username} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                username,
                email,
                password,
                picture: ''
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

app.listen(9002,() => {
    console.log("BE started at port 9002")
})