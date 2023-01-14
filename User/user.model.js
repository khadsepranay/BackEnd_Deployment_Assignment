let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requierd:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['Seller','Customer']
    }
})

let UserModel = mongoose.model('Users',UserSchema)

module.exports = UserModel