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

if(typeof(process.env.CLOUDINARY_URL)==undefined){
    console.warn('cloudinery usl is undefined')
}
else{
    cloudinary.config({ 
        cloud_name: 'df2rf5byk', 
        api_key: '385611574179785', 
        api_secret: '6Edh0hQsLtQUE95Wx7P4j_jedOA'
       
      });
      

}

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
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