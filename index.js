const express = require("express")
const app = express()
const port = 5500
const cors = require("cors")
const logInRouter = require("./src/Router/login routs")
const register = require("./src/Router/signup")
const postRouter = require('./src/Router/postRoute')
const dotenv = require('dotenv')
const cloudinary = require ("cloudinary").v2;
dotenv.config()


const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://Purushothama_G:puru555papu@cluster0.xaulxac.mongodb.net/recipe?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) console.log(err.message)
    else{
    console.log('Successfully Connected to DB')
    }
})


app.use(cors())
app.use("/app/v1", postRouter)
app.use("/app/v1", register)
app.use("/app/v1", logInRouter)
app.get("/app/v1", (req, res)=>{
    res.send("comming")
})

app.listen(port, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Server is listening at", port)
    }
})