let mongoose = require('mongoose')

let CartSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

let CartModel = mongoose.model('Carts',CartSchema)

module.exports = CartModel