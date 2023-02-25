const express = require("express")
const signModel = require("../model/signModel")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
router.use(express.json())
router.use(express.urlencoded())


router.post("/signin", async(req, res)=>{
    try{
        const {email, password} = req.body
        const data = await signModel.findOne({email:email})
        if(!data){
            res.status(403).json({
                status:"Failure",
                message:"User id not Found"
            })
        }else{
            bcrypt.compare(password, data.password, (err, bool)=>{
                if(!bool){
                    res.status(404).json({
                        status:"failure",
                        message:"Invalid password"
                    }) 
                }
                else{
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: 'foobar'
                      }, 'secret'); 
                      res.status(200).json({
                        status:"Success",
                        message:token
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