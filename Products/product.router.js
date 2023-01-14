let express = require('express')
const ProductModel = require('./product.model')
let jwt = require('jsonwebtoken')

let ProductRouter = express.Router()
let Create_MiddleWare = require('../MiddleWare/MiddleWare')


ProductRouter.post('/create',Create_MiddleWare,async(req,res)=>{
    try{
        let Info = req.body
        let Product = await ProductModel.create({...Info})
        res.status(201).send({"msg":'Product created successfully',Product})
    }catch(err){
        res.send(err)
    }
})


ProductRouter.patch('/update/:id',async(req,res) =>{
    let token = req.headers.authorization
    let User = jwt.verify(token,'access')
    let Product_id = req.params.id
    let info = req.body
    try{
        let Product = await ProductModel.findOneAndUpdate({creator_id:User.id,_id:Product_id},{...info},{new:true})
        if(Product){
            res.send(Product)
        }else{
            res.send('Product Not Found')
        }
    }catch(err){
        res.send(err)
    }
}
)

ProductRouter.delete('/delete/:id',async(req,res)=>{
    let token = req.headers.authorization
    let User = jwt.verify(token,'access')
    let Product_id = req.params.id
    try{
        let Product = await ProductModel.findOneAndDelete({creator_id:User.id,_id:Product_id})
        if(Product){
            res.send(`Product with id:${Product_id} has been deleted`)
        }else{
            res.send('Product Not Found')
        }
    }catch(err){
        res.send(err)
    }
}
)

module.exports = ProductRouter