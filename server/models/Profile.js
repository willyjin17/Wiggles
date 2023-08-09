const mongoose = require ("mongoose");

const ProfileSchema = new mongoose.Schema({
    name:{type:String,required:true},
    dob:{type:Date},
    breed:{type:String,required:true},
    gender:{type:String,required:true},
    playdate:{type:Boolean},
    image:{
        type:String
    },
    bio:{type: String},
    dueDate:{type: Date},
    address: {type: String},
}) 

const ProfileModel = mongoose.model("profile",ProfileSchema)

module.exports = ProfileModel;   