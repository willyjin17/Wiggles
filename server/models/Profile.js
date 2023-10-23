const mongoose = require ("mongoose");

const NotificationSchema= new mongoose.Schema({
    title : {type: String},
    message : {type: String},
    friendID: {type:  mongoose.Schema.ObjectId},
    date: { type: Date, default: Date.now },
    viewed: {type: Boolean, default: false},
    image: {type: String},
})

const VaccinationSchema= new mongoose.Schema({
    name:{type:String},
    batchNumber:{type: Number},
    date:{type: Date},
    dueDate:{type:Date},
})

const ProfileSchema = new mongoose.Schema({
    name:{type:String,required:true},
    dob:{type:Date},
    breed:{type:String,required:true},
    gender:{type:String,required:true},
    vaccinated:{type:Boolean},
    image:{
        type:String
    },
    bio:{type: String},
    dueDate:{type: Date},
    address: {type: String},
    friends: [{type: mongoose.Schema.ObjectId}],
    requestSent: [{type: mongoose.Schema.ObjectId}],
    requestRecieved: [{type: mongoose.Schema.ObjectId}],
    notifications: [{type: NotificationSchema}],
    height: {type: Number},
    weight: {type: Number},
    allergies: {type: String},
    conditions: {type: String},
    vetName: {type: String},
    vetNumber: {type: Number},
    vetAddress: {type: String},
    vaccinations: [{type: VaccinationSchema}]
}) 

const ProfileModel = mongoose.model("profile",ProfileSchema)

module.exports = ProfileModel;   