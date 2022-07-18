import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
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
    picture: String

})

const User = new mongoose.model("User", userSchema)

app.post("/edit", (req, res) => {
    const {username, name, email, password, picture} = req.body
    try {
        User.findOneAndUpdate({ email: email }, {$set:{name: name, username: username, password: password, picture: picture}});
        res.send("Update Complete")
    }
    catch (e){
        print(e);
    }
    
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