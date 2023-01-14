const UserModel = require("../User/user.model")
let jwt = require('jsonwebtoken')

let Create_MiddleWare = async(req,res,next)=>{
    let token = req.headers.authorization
    if(!token){
        res.send('Please provide token')
    }
    try{
        let User = jwt.verify(token,'access')
        let UserDetail = await UserModel.findById(User.id)
        if(UserDetail.role!='Seller'){
            return res.status(403).send('Only seller can create product')
        }
        if(User){
            req.body.creator_id = User.id
            next()
        }else{
            res.send('token expired... do login again')
        }
    }catch(err){
        res.send(err)
    }
}

module.exports = Create_MiddleWare