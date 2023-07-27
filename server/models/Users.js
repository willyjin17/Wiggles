//Schema for user's info
const mongoose = require ("mongoose");

const UserSchema = new mongoose.Schema({
    phone:{type:Number,required:true}, 
    email:{ type:String, required: true, unique:true},
    password:{ type:String, required:true,}
})

const UserModel = mongoose.model("UsersCollection",UserSchema)

module.exports = UserModel;   