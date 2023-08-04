const express = require("express");
const UserModel = require("../models/Users");
require("dotenv").config();
const ProfileModel = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const path = require("path")
const router = express.Router();

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"./Images")
  },
  filename:(req,file,cb)=>{
    console.log(file);
    cb(null,Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({storage:storage})

//api for register
router.post("/register", async (req, res) => {
  const { phone, email, password, } = req.body;

  if(phone.length<10){
    return res.status(400).json({message:"Length of Phone Number should be 10 digits" })
  }

  if(password<=4){
    return res.status(400).json({message:"Length of password should be greater than 4"})
  }

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists!" });   
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
    maxAge:1000*60*100, 
    withCredentials: true,
    httpOnly: false,
  });

  res.json({ message: "User Registered Successfully!" });
});

//api for profile (secondary reg.)
router.post("/secondaryregister",upload.single("image"),async(req,res)=>{
    const {name,dob,breed,gender,playdate,userOwner} = req.body;
    const image = req.file.filename;

    const newProfile = new ProfileModel({name,dob,breed,gender,playdate,image,userOwner})
    await newProfile.save();

    res.json({message:"Profile Data Saved"})
})

module.exports = router;