const mongoose = require ("mongoose");

const QrSchema = new mongoose.Schema({
    message: {type:String, default:""},
    contactNumber:{type: String},
    alternateNumber:{type: String},
    switchState: { type: Boolean, default: false } ,
}) 

const QrModel = mongoose.model("QR-Message",QrSchema) 

module.exports = QrModel;    
