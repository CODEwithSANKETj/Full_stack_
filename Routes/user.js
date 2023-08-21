const express = require('express')
const { Register_middlewear } = require('../Middlewears/register_middlewear')
const { User_model } = require('../Models/user_model')
const bcrypt = require('bcrypt');
const register_router  = express.Router()
var jwt = require('jsonwebtoken');
register_router.post('/register',Register_middlewear,async(req,res)=>{
    const {name,email,gender,password,age,city,is_married} = req.body
    try{
        const is_already_in_DB = await User_model.findOne({email:email})
        if(is_already_in_DB){
           return  res.status(200).send({msg:'User Alreay registered Please Login'})
        }
        else{
           bcrypt.hash(password, 5,(err, hash)=> {
                // Store hash in your password DB.
                if(err){
                    res.send({msg:err})
                }
                else{
                    req.body.password=hash
                    const new_user = new User_model(req.body)
                    new_user.save()
                    res.status(200).send({msg:"User Registered "})
                }
                
            });
        }
    }
    catch(err){
        res.status(404).send({msg:err})
    }
    
})
register_router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    if(email&&password){
        try{
            const is_user_exists = await User_model.findOne({email:email})
            if(is_user_exists){
                bcrypt.compare(password, is_user_exists.password, (err, result)=> {
                    if(err){
                        res.send(404).send({msg:err})
                    }
                    else{
                        if(result){
                            const token  = jwt.sign({userId:is_user_exists._id},'masai')

                            res.status(200).send({msg:'User Logged In',token:token})
                        }
                        else{
                            res.status(200).send({msg:'Invalid Password Entered'})
                        }
                    }
                });
            }
            else{
                res.status(200).send({msg:"Please Check your Credentials"})
            }
        }
        catch(err){
            res.send(404).send({msg:err})
        }
    }
    else{
        res.send({msg:"Please Provide email and Password"})
    }

})
module.exports = {
    register_router
}