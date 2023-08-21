const express = require('express')
const { connection } = require('./db')
const { register_router } = require('./Routes/user')
const { post_router } = require('./Routes/posts')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use('/users',register_router)
app.use('/posts',post_router)
app.get('/',(req,res)=>{
    res.status(200).send(`<h1>Welcome to Home page</h1>`)
})
app.listen(4040,()=>{
    try{
        if(connection){
            console.log('server running');
            console.log('Connected to DB')
        }
        else{
            console.log('Not connected');
        }
    }
    catch(err){
        console.log(err);
    }
})