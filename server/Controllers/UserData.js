const ProfileModel = require("../models/Profile");

module.exports.profileData = async(req,res)=>{    
    const userID=req.cookies.userID;

    const foundUser=await ProfileModel.findOne({_id:userID});
    if(foundUser)
        res.json({status:"ok", foundUser});
    else{
        res.json({status: "fail"});
    }
}

module.exports.Data = async(req,res)=>{
    const Users=await ProfileModel.find();
    res.json({Users});
}