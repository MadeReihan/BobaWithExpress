const mongoose = require('mongoose')

let requestSchema = mongoose.Schema({
    facility:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Facility'
    },
    user:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:[true,"hari tidak boleh kosong"]
    },
    start_time:{
        type:String,
        require:[true,"jam awal tidak boleh kosong"]
    },
    end_time:{
        type:String,
        require:[true,"jam akhir tidak boleh kosong"]
    },
    


},{timestamps:true})

module.exports = mongoose.model('Request', requestSchema)