const express = require("express");
const UserModel = require("../models/Users");
require("dotenv").config();
const ProfileModel = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const path = require("path");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

require("dotenv").config();


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

const storage = multer.diskStorage({})

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
    maxAge:1000*60*60*24*3, 
    withCredentials: true,
    httpOnly: false,
  });

  const foundUser=await UserModel.findOne({email:email});
  res.cookie("userID",foundUser.id,{
    maxAge:1000*60*60*24*3, 
    withCredentials: true,
    httpOnly: false,
  });

  res.json({ message: "User Registered Successfully!" });
});

//api for profile (secondary reg.)
router.post("/secondaryregister", upload.single("image"),async (req, res) => {
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
});


//api for updating profile data
router.put("/updateProfile", upload.single("image"), async (req, res) => {
  try {
    const { name, dob, breed, gender, playdate } = req.body;
    const imageFilePath = req.file.path;
    const cldRes = await handleUpload(imageFilePath);
    const userID = req.cookies.userID;

    const updatedFields = {
      name,
      dob,
      breed,
      gender,
      playdate,
      image: cldRes.secure_url
    };

    const updatedProfile = await Profile.findByIdAndUpdate(
      userID,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ message: "Profile Data Updated", profile: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating profile data." });
  }
});

// let updateFields = {};
// if (name) updateFields.name = name;
// if (dob) updateFields.dob = dob;
// if (breed) updateFields.breed = breed;
// if (gender) updateFields.gender = gender;
// if (playdate) updateFields.playdate = playdate;

// if (req.file) {
//   const cldRes = await handleUpload(imageFilePath);
//   updateFields.image = cldRes.secure_url;
// }

// const updatedProfile = await ProfileModel.findByIdAndUpdate(
//   profileID,
//   { $set: updateFields },
//   { new: true }
// );

// if (!updatedProfile) {
//   return res.status(404).json({ message: "Profile not found" });
// }

// res.json({ message: "Profile Data Updated", profile: updatedProfile });
// } catch (error) {
// console.error(error);
// res.status(500).json({ message: "An error occurred while updating profile data." });
// }
// });

module.exports = router;
