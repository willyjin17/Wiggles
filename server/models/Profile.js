const mongoose = require ("mongoose");

const ProfileSchema = new mongoose.Schema({
    name:{type:String,required:true},
    dob:{type:Date,required:true},
    breed:{type:String,required:true},
    gender:{type:String,required:true},
    playdate:{type:Boolean},
    img:
    {
        data: Buffer,
        contentType: String
    },
    userOwner:{type: mongoose.Schema.Types.ObjectId, ref:"UsersCollection" }
})

const ProfileModel = mongoose.model("profile",ProfileSchema)

module.exports = ProfileModel;   