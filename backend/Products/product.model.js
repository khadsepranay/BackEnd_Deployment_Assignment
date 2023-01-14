let mongoose = require('mongoose')

let ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:1
    },
    creator_id:{
        type:String,
        required:true
    }
})

let ProductModel = mongoose.model('Products',ProductSchema)

module.exports = ProductModel