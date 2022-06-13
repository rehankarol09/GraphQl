const mongoose = require('mongoose')


const ClientSchema = new mongoose.Schema({

    name:{type:String},
    email:{type:String},
    phoneNo:{type:String}

});

module.exports= mongoose.model("Client",ClientSchema)