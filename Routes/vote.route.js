const express = require("express")
const http = require("http")
const voteRouter = express.Router()
const os = require('os');
const voteModel = require("../Models/Vote.model");
var randomstring = require("randomstring");

voteRouter.get('/vote',async (req,res)=>{
let allvotes = await voteModel.find({})
try {
    res.status(200).send({msg:"All votes",data:allvotes})
} catch (error) {
    res.status(403).send({msg:error.message})
}


})


voteRouter.post('/vote/add',async (req,res)=>{
    
    const {option} = req.body; 
    const ipAddress = req.ip;
    
    try {

        let findPerson = await voteModel.find({ip:ipAddress})
        if(findPerson.length > 0){
        res.status(400).send({msg:"Already Voted"})

     }else{
         let newvote = new voteModel({option,ip:ipAddress})
         await newvote.save()
         let arr = []
        for(let i = 0; i < 3; i++){
          arr.push({ip:randomstring.generate(7),option:"option_3"})
        }
         await voteModel.insertMany(arr)

         res.status(200).send({msg:"Vote Successfull",data:newvote})
     }
    
    } catch (error) {
        res.status(403).send({msg:error.message})
    }
    
})

module.exports = voteRouter