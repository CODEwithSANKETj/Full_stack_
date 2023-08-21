const mongoose = require('mongoose')
const user_schema = mongoose.Schema({
    name : {type:String,required:true},
    email:{type:String,required:true},
    gender:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:Number,required:true},
    city:{type:String,required:true},
    is_married:{type:Boolean,required:true}
})
const User_model = mongoose.model('User',user_schema)
module.exports = {
    User_model
}