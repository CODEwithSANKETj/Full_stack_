const express = require('express')
const { Auth } = require('../Middlewears/auth_middlewear')
const { User_post_model } = require('../Models/user_post_model')
const post_router = express.Router()

post_router.post('/add',Auth,(req,res)=>{
    const {title,body,device,no_of_comments} = req.body
    console.log(title,body,device,no_of_comments);
    if(title&&body&&device&&no_of_comments){
        try{
            const new_post = new User_post_model(req.body)
            new_post.save()
            //console.log(req.body);
            return res.status(200).send({msg:'Posts added Successfully'})
        }
        catch(err){
            return res.status(200).send({msg:err})
        }
    }
    else{
        res.send({msg:"Please Provide Correct details for post"})
    }
})
post_router.get('/',Auth,async(req,res)=>{
    const {user_id} = req.body
    try{
        const all_post = await User_post_model.find({user_id:user_id})
        return  res.status(200).send({msg:all_post})
    }
    catch(err){
        return res.status(404).send({msg:err})
    }
})
post_router.get('/top',Auth,async(req,res)=>{
    const {user_id} = req.body
    try{
        const all_post = await User_post_model.aggregate([
            {$match : {user_id:user_id}},
            {$group:{_id:null,maxComments:{$max:'$no_of_comments'}}}
        ])
        if(all_post.length===0){
            return res.send('No post found')
        }
        const maxComment = all_post[0].maxComments
        const final = await User_post_model.find({user_id:user_id,no_of_comments:maxComment})
        return  res.status(200).send({msg:final})
    }
    catch(err){
        return res.status(404).send({msg:err})
    }
})
post_router.patch('/update/:id',Auth,async(req,res)=>{
    const {id }= req.params
    
    try{
        const target_post = await User_post_model.findOne({_id:id})
        console.log(target_post,req.body.user_id);
        if(target_post.user_id === req.body.user_id){
            const updated = await User_post_model.findByIdAndUpdate(target_post._id,req.body,{new:true})
            return res.status(200).send({msg:"Post is Updated"})
        }
        else{
         return    res.send({msg:"You are not authorised"})
        }
    }
    catch(err){
       return  res.send({msg:err})
    }
})
post_router.delete('/delete/:id',Auth,async(req,res)=>{
    const {id }= req.params
    
    try{
        const target_post = await User_post_model.findOne({_id:id})
        console.log(target_post,req.body.user_id);
        if(target_post.user_id === req.body.user_id){
            const updated = await User_post_model.findByIdAndDelete(target_post._id)
            return res.status(200).send({msg:"Post is Deleted"})
        }
        else{
         return    res.send({msg:"You are not authorised"})
        }
    }
    catch(err){
       return  res.send({msg:err})
    }
})
module.exports = {
    post_router
}