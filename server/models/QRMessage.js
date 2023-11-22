const mongoose = require ("mongoose");

const QrSchema = new mongoose.Schema({
    message: {type:String, default:""},
    contactNumber:{type:Number},
    alternateNumber:{type:Number},
    switchState: { type: Boolean, default: false } ,
}) 

const QrModel = mongoose.model("QR-Message",QrSchema) 

module.exports = QrModel;    
