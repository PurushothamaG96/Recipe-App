const mongoose = require('mongoose')
const {model, Schema} = mongoose


const recipScema = Schema({
    name:{type:String},
    author:{type:String},
    url:{type:String},
    ingredients:{type:String},
    description:{type:String}
},{timestamps:true})

const recipModel = model("recipe", recipScema)

module.exports = recipModel