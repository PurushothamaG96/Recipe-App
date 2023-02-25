const express = require("express")
const router = express.Router()
const signModel = require("../model/signModel")
const bcrypt = require("bcrypt")

router.use(express.json())
router.use(express.urlencoded())


router.post("/signup", async(req, res)=>{
    const {email, password} = req.body
    try{
        const data = await signModel.findOne({email:email})
        if(data){
            res.json({
                status:"failure",
                message:"User already exists"
            })
        }
        else{
            bcrypt.hash(password, 10, async(err, encry)=>{
                if(err){
                    res.status(500).json({
                        status:"failure",
                        message:"Internal Server error"
                    }) 
                }
                else{
                    const data = await signModel.create({
                        email,
                        password:encry 
                    })
                    res.status(201).json({
                        status:"Success",
                        message:data
                    })
                }
            })
            
    
        }
        
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message:e.message
        })
    }
} )

module.exports = router