const jwt = require('jsonwebtoken')
function Auth(req,res,next){
    const token  = req.header('Authorization')
    if(!token){
        return res.status(404).send({msg:'Please log In first'})
    }
    try{
        const decoded = jwt.verify(token,'masai')
        //console.log(decoded);
        req.body.user_id = decoded.userId
        next()
    }
    catch(err){
       return  res.status(404).send({msg:'Ivalid token'})
    }
}
module.exports = {
    Auth
}
