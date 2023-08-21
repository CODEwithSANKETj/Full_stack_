const mongoose = require('mongoose')
const user_post_schema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,required:true},
    no_of_comments:{type:Number,required:true},
    user_id:{type:String,required:true}

})
const User_post_model  = mongoose.model('Post',user_post_schema)
module.exports ={
    User_post_model
}