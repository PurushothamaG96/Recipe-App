const express = require("express")
const app = express()
const port = 5500
const cors = require("cors")
const logInRouter = require("./src/Router/login routs")
const register = require("./src/Router/signup")

const mongoose = require("mongoose")
async function main(){
    await mongoose.connect("mongodb+srv://Purushothama_G:puru555papu@cluster0.xaulxac.mongodb.net/recipe?retryWrites=true&w=majority")
    console.log("db connected")
}
main()


app.use(cors())

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