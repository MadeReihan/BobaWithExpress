const mongoose = require('mongoose')

let facilitySchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"nama tidak boleh kosong"]
    },
    thumbnail:{
        type:String,
        require:[true,"thumbnail tidak boleh kosong"]
    },
    body:{
        type:String,
        require:[true,"password tidak boleh kosong"]
    },
    


},{timestamps:true})

module.exports = mongoose.model('Facility', facilitySchema)