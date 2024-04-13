const ProfileModel = require("../models/Profile");

// Add new vaccination record
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