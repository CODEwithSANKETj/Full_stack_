function Register_middlewear(req,res,next){
    const {name,email,gender,password,age,city,is_married} = req.body
    console.log(name,email,gender,password,age,city,is_married);
    if(name&&email&&gender&&password&&age&&city&&is_married){
        next()
    }
    else{
        res.send({msg:"please provide valid body"})
    }
}
module.exports = {
    Register_middlewear
}