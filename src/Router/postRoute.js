const express = require("express")
const router  = express.Router()
const recepModel = require('../model/recipeModel')

router.use(express.json())
router.use(express.urlencoded())

router.post("/post", async(req, res)=>{
    const {name, author, url,ingredients, description } = req.body
    try{
        const data = await recepModel.create({
            name,
            author,
            url,
            ingredients,
            description
        })
        res.status(201).json({
            status:"Success",
            message:data
        })

    }catch(e){
        res.status(500).json({
            status:"Failure",
            message:e.message
        })
    }
} )

router.get("/post",async(req, res)=>{
    try{
        const data = await recepModel.find() 
        res.status(200).json({
            status:"Success",
            data
        })
        
    }catch(e){
        res.status(500).json({
            status:"Failure",
            message:e.message
        })
    }
} )

router.get("/post/:id",async(req, res)=>{
    try{
        console.log(req.params)
        const search = `\^${req.params.id}`
        const data = await recepModel.find({name:{$regex:search, $options:"i"}})
         
        res.status(200).json({
            status:"Success",
            data
        })
        
    }catch(e){
        res.status(500).json({
            status:"Failure",
            message:e.message
        })
    }
} )


module.exports = router