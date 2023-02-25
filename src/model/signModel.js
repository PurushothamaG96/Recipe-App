const mongoose = require('mongoose')
const {model, Schema} = mongoose


const signScema = Schema({
    email:{type:String, required:true},
    password:{type:String, required:true}
})

const signModel = model("user", signScema)

module.exports = signModel