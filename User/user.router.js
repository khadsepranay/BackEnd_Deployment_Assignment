let express = require('express')
const UserModel = require('./user.model')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')

let UserRouter = express.Router()


UserRouter.post('/signup',async(req,res)=>{
    let info = req.body
    try{
        if(info.email.includes("@seller.com")){
            info.role = 'Seller'
        }else{
            info.role = 'Customer'
        }
        let hash_password = await bcrypt.hash(info.password,10)
        let User = await UserModel.create({...info,password:hash_password})
        res.send('User has been created')
    }catch(err){
        res.send(`User already created with email ${info.email}`)
    }
})

UserRouter.post('/login',async(req,res)=>{
    try{
        let {email,password} = req.body
        let User = await UserModel.findOne({email})
        console.log(User)
        if(!User){
            res.status(401).send('User not found')
        }else{
            bcrypt.compare(password,User.password,(err,suc)=>{
                console.log(err)
                if(!suc){
                    res.send('Password is wrong')
                }else if(suc){
                    let access_token = jwt.sign({id:User._id},'access',{expiresIn:'59 minutes'})
                    let refresh_token = jwt.sign({id:User._id},'refresh',{expiresIn:'1 day'})
                    res.status(200).send({
                        access_token,
                        refresh_token
                    })
                }else{
                    res.send(err)
                }
            })
        }
    }catch(err){
        res.send(err)
    }
})


module.exports = UserRouter