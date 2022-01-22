const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"nama tidak boleh kosong"]
    },
    email:{
        type:String,
        require:[true,"email tidak boleh kosong"]
    },
    password:{
        type:String,
        require:[true,"password tidak boleh kosong"]
    },
    role:{
        type:String,
        enum:['admin','user','management'],
        default:'admin'
    },
    


},{timestamps:true})

module.exports = mongoose.model('User', userSchema)