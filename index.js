require('dotenv').config()
let express = require('express')
let mongoose = require('mongoose')
let jwt = require('jsonwebtoken')
let cors = require('cors')
let Port = process.env.Port
let DB_URL = process.env.DB_URL
let app = express()
app.use(express.json())
app.use(cors())
let CartModel = require('./Carts/cart.model')

let UserRouter = require('./User/user.router')
let ProductRouter = require('./Products/product.router')
let CartRouter = require('./Carts/cart.router')


app.use('/user',UserRouter)
app.use('/product',ProductRouter)
app.use('/cart',CartRouter)




mongoose.connect(DB_URL).then(()=>{
    app.listen(Port,()=>{
        console.log(`Listening to Port ${Port}`)
    })
})



/*
{ 
  "name":"Pranay Khadse",
  "age":28,
  "email":"pranitkhadse20@gmail.com",
  "password":"123"
}
{ 
  "title":"Shirts",
  "desc":"XL",
  "price":1099
}
*/