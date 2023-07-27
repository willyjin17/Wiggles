const express = require("express");
const UserModel = require("../models/Users");
const ProfileModel = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

//api for register
router.post("/register", async (req, res) => {
  const { phone, email, password, } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists!" });   
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ phone ,email, password: hashedPassword });
  await newUser.save();
 
  res.json({ message: "User Registered Successfully!" });
});


//api for profile (secondary reg.)
router.post("/secondaryregister",async(req,res)=>{
    const {name,dob,breed,gender,playdate,image,userOwner} = req.body;

    const newProfile = new ProfileModel({name,dob,breed,gender,playdate,image,userOwner})
    await newProfile.save();

    res.json({message:"Profile Data Saved"})
})



//api for login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await UserModel.findOne({ email });

//   if (!user) {
//     return res.status(400).json({ message: "User doesn't exists!" });
//   }
//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res
//       .status(400)
//       .json({ message: "Username or Password is Incorrect!" });
//   }

//   const token = jwt.sign({ id: user._id }, "secret");
//   res.json({ token, userID: user._id });
// });

module.exports = router;
