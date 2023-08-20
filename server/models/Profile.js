const mongoose = require ("mongoose");

const NotificationSchema= new mongoose.Schema({
    title : {type: String},
    message : {type: String},
    friendID: {type:  mongoose.Schema.ObjectId},
    date: { type: Date, default: Date.now },
    hidden: {type: Boolean},
})

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
    friends: [{type: mongoose.Schema.ObjectId}],
    requestSent: [{type: mongoose.Schema.ObjectId}],
    requestRecieved: [{type: mongoose.Schema.ObjectId}],
    notifications: [{type: NotificationSchema}]
}) 

const ProfileModel = mongoose.model("profile",ProfileSchema)

module.exports = ProfileModel;   