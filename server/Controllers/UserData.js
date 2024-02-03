const { log } = require("console");
const ProfileModel = require("../models/Profile");
const cloudinary = require("cloudinary").v2;

// To get data of a single profile based on userID
module.exports.profileData = async (req, res) => {
  const userID = req.body.userID || req.cookies.userID;

  const foundUser = await ProfileModel.findOne({ _id: userID });
  if (foundUser)
    res.json({ status: "ok", foundUser, userID: req.cookies.userID });
  else {
    res.status(401).json({ status: "fail", userID });
  }
};

// To get all data
module.exports.Data = async (req, res) => {
  const Users = await ProfileModel.find();
  res.json({ status: "ok", Users, userID: req.cookies.userID });
};

module.exports.UpdateVaccinations = async (req, res) => {
  const userID = req.cookies.userID;

  const foundUser = await ProfileModel.findOne(
    { _id: userID },
    { vaccinations: 1 }
  );

  const userVaccinations = foundUser.vaccinations;
  userVaccinations.unshift(req.body.visit);
  const updatedProfile = await ProfileModel.updateOne(
    { _id: userID },
    { $set: { vaccinations: userVaccinations } }
  );

  res.json({ status: "ok" });
};

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

// Function to delete image from Cloudinary using Public ID
async function deleteImageFromCloudinary(publicId) {
  await cloudinary.uploader.destroy(publicId);
}

// Function to extract Public ID from Cloudinary URL
function extractPublicIdFromImageUrl(imageUrl) {
  const parts = imageUrl.split("/");
  const publicId = parts[parts.length - 1].split(".")[0]; // Assuming the public ID is just before the file extension
  return publicId;
}

module.exports.UpdateProfile = async (req, res) => {
  try {
    const userID = req.cookies.userID;
    const oldProfile = await ProfileModel.findById(userID);
    const oldImageUrl = oldProfile.image;
    const oldPublicId = oldImageUrl && extractPublicIdFromImageUrl(oldImageUrl);
    const { name, dob, bio, breed, gender, address } = req.body;
    const {
      height,
      weight,
      allergies,
      conditions,
      vetName,
      vetNumber,
      vetAddress,
    } = req.body;
    const imageFilePath = req.file ? req.file.path : null;

    let cldRes = null;
    if (imageFilePath) {
      cldRes = await handleUpload(imageFilePath);

      // Delete the Old Image from Cloudinary
      if (oldPublicId) {
        await deleteImageFromCloudinary(oldPublicId);
      }
    }

    const updatedFields = {
      name,
      dob,
      breed,
      gender,
      bio,
      address,
      height,
      weight,
      allergies,
      conditions,
      vetName,
      vetNumber,
      vetAddress,
      ...(imageFilePath
        ? { image: cldRes.secure_url }
        : { image: req.body.image != "null" ? req.body.image : "" }),
    };

    const updatedProfile = await ProfileModel.updateOne(
      { _id: userID },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json({ message: "Profile Data Updated", profile: updatedProfile });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating profile data." });
  }
};
