let express = require('express')
const CartModel = require('./cart.model')
let jwt = require('jsonwebtoken')

let CartRouter = express.Router()


CartRouter.post('/create',async(req,res)=>{
    let {productId,quantity} = req.body
    let token = req.headers.authorization
    if(!token){
        res.send('Please provide token')
    }
    let User = jwt.verify(token,'access')
    if(!User){
        res.send('token expired')
    }
    try{
        let item = await CartModel.create({user:User.id,product:productId,quantity})
        res.send({item})
    }catch(err){
        res.send(err)
    }
})

CartRouter.get('/',async(req,res)=>{
    let token = req.headers.authorization
    if(!token){
        res.send('Please provide token')
    }
    let User = jwt.verify(token,'access')
    if(!User){
        res.send('token expired')
    }
    try{
        let cartItems = await CartModel.find({user:User.id}).populate(['product'])
        res.send(cartItems)
    }catch(err){
        res.send(err)
    }
})


module.exports = CartRouter