const express = require("express");
const { Task } = require("../Models/Todo");
const { Users } = require("../Models/User.model");
const mongoose = require("mongoose");

const Router = express.Router();

Router.post('/add',async (req,res)=>{
console.log('you hit')
   try {
    if(req.body.userid.length!=24) return res.status(400).send({message:'Invalid id'})
    let user = await Users.findOne({ _id: req.body.userid });
    if(user) {
        let task= await Task.create({
           user_id:req.body.userid,
           taskList:[{
            taskid:new mongoose.Types.ObjectId(),
            task:req.body.task
           }]
          });
        
        return res.send({mesg:'found'})
    }
  else return res.send({msg:'nope'})
   } catch (error) {
    console.log(error)
   }
   
})
module.exports=Router