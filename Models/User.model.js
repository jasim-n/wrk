const mongoose=require('mongoose');

const User=new mongoose.Schema({

    email:{type:String}
    ,
    fullName:{type:String},
    password:{type:String},


})
const users=mongoose.model('User',User);
module.exports.Users=users;