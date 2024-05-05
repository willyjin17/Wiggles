require("dotenv").config();
const QrModel = require("../models/QRMessage");

module.exports.QrData = async(req,res)=>{
  const userID=req.body.id || req.cookies.userID;

  const foundUser=await QrModel.findOne({_id:userID});
  if(foundUser)
      res.json({status:"ok", foundUser});
  else{
      res.json({status: "fail"});
  }
}

 
module.exports.QrCode = async (req, res) => {
  try {
    const { message, contactNumber, alternateNumber } = req.body;
    const userID = req.cookies.userID;
    const findMessage = await QrModel.findOne({ _id: userID });

    if (findMessage) { 

      const updatedProfile = await QrModel.updateOne(
        { _id: userID },
        { $set: { contactNumber, alternateNumber, message } },
        { new: true }
        
      );
    } else {
      const Qrmessage = new QrModel({
        message, 
        contactNumber,
        alternateNumber,
        id: userID,
      });


      await Qrmessage.save();
    }
    res.status(201).json({ message: "Message saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving message" });
  }
};

module.exports.QrSwitch = async(req,res) =>{
  try {
    const {switchState}  = req.body;
    const userID = req.cookies.userID;
    const findMessage = await QrModel.findOne({ _id: userID });

    if (findMessage) {
      const updatedProfile = await QrModel.updateOne(
        { _id: userID },
        { $set: { switchState } },
        { new: true }
        
      );
    } else {
      const Qrmessage = new QrModel({
        switchState,
        id: userID,
      });


      await Qrmessage.save();
    }
    res.status(201).json({ message: "Message saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving message" });
  }
}