require("dotenv").config();
const UserModel = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const cloudinary = require("cloudinary").v2;
const ProfileModel = require("../models/Profile");
const cookieParser = require('cookie-parser')

module.exports.Login = async (req, res, next)=>{
  const email=req.body.email;
  const password=req.body.password;

  if(!email || !password ){
    return res.json({message:'All fields are required'}) 
  }

  const foundUser=await UserModel.findOne({email:email})
      
  if(foundUser){
      result= await bcrypt.compare(password,foundUser.password)
      if(result==true){
          const token=jwt.sign({
              email: foundUser.email,
          }, process.env.JWT_SECRET_KEY ,{
              expiresIn: 3*24*60*60, 
          });
          res.cookie("token", token, {
              maxAge:1000*60*60*24*3, 
              withCredentials: true,
              httpOnly: false,
              secure: true,
              sameSite:'none',
          });
          res.cookie("userID",foundUser._id,{
              maxAge:1000*60*60*24*3, 
              withCredentials: true,
              httpOnly: false,
              secure: true,
              sameSite:'none',
          });

          return res.json({status:'ok'});
      }
      else{
          return res.json({status:'forgot', message: "Incorrect password"});
      }
  }
  else{
      return res.json({status:'false', message: "Kindly enter correct email."});
  }
};


module.exports.Register = async(req,res)=>{
    const { phone, email, password, } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.json({ status:"fail", message: "User already exists!" });   
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ phone ,email, password: hashedPassword });
  await newUser.save();

  const token=jwt.sign({
    email: email,
  }, process.env.JWT_SECRET_KEY ,{
    expiresIn: 3*24*60*60,
  });
  res.cookie("token", token, {
    maxAge:1000*60*60*24*3, 
    withCredentials: true,
    httpOnly: false,
    secure: true,
    sameSite:'none',
  });

  const foundUser=await UserModel.findOne({email:email});
  res.cookie("userID",foundUser.id,{
    maxAge:1000*60*60*24*3, 
    withCredentials: true,
    httpOnly: false,
    secure: true,
    sameSite:'none',
    path:'/',
    domain: '.wiggles-backend.vercel.app'
  });

  res.json({ status: "ok", message: "User Registered Successfully!" });
}


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  
  async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  }


module.exports.SecondaryRegister= async(req,res) =>{
    try {
        const { name, dob, breed, gender, vaccinated, bio } = req.body;
        const imageFilePath = req.file.path;
        const cldRes = await handleUpload(imageFilePath);
        const userID = req.cookies.userID;
    
        const newProfile = new ProfileModel({
          name,
          dob,
          breed,
          gender,
          vaccinated,
          image: cldRes.secure_url,
          bio,  
          id: userID,
        });
        await newProfile.save();
    
        res.json({ message: "Profile Data Saved" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while saving profile data." });
      }
}

module.exports.ChangePassword = async(req, res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser=await UserModel.updateOne({email: email}, {$set:{password: hashedPassword}});
    const token=jwt.sign({ email: email,},
        process.env.JWT_SECRET_KEY ,{
        expiresIn: 3*24*60*60,
    });
 
    res.cookie("token", token, {
        maxAge:1000*60*60*24*3, 
        withCredentials: true,
        httpOnly: false,
        secure: true,
        sameSite:'none',
    });
    
    const foundUser=await UserModel.findOne({email:email});
    res.cookie("userID",foundUser.id,{
        maxAge:1000*60*60*24*3, 
        withCredentials: true,
        httpOnly: false,
        secure: true,
        sameSite:'none',
    });
    
    res.json({ status:'ok', message: "Password successfully updated!" });
};

module.exports.Logout = (req,res) =>{
  //clearing cookie
  const cookieValue = req.cookies;
  if (cookieValue) {
    // res.clearCookie('token',{ domain: '.wiggles-backend.vercel.app', path: '/' });
    // res.clearCookie('userID',{ domain: '.wiggles-backend.vercel.app', path: '/' });
    res.cookie('token','',{ expires: new Date(0),domain: '.wiggles-backend.vercel.app', path: '/' });
    res.cookie('userID','',{ expires: new Date(0),domain: '.wiggles-backend.vercel.app', path: '/' });
    res.status(200).send('Logged out successfully');
    res.end();
  } else {
    res.status(400).send('Cookie not found'); // Handle the case where the cookie doesn't exist
  }
}