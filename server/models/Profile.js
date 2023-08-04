const mongoose = require ("mongoose");

const ProfileSchema = new mongoose.Schema({
    name:{type:String,required:true},
    dob:{type:Date},
    breed:{type:String,required:true},
    gender:{type:String,required:true},
    playdate:{type:Boolean},
    // image:
    // {
    //     data: Buffer,
    //     contentType: String
    // },
    image:{
        type:String
    },
    userOwner:{type: mongoose.Schema.Types.ObjectId, ref:"UsersCollection" }
}) 

const ProfileModel = mongoose.model("profile",ProfileSchema)

module.exports = ProfileModel;   