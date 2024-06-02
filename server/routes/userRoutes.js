const router = require("express").Router();
const {
  profileData,
  Data,
  UpdateProfile,
} = require("../controllers/userController");
const { UpdateVaccinations } = require("../controllers/vaccinationController");
const { userVerification, temp } = require("../middleware/authMiddleware");

const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

router.get("/data", temp, Data);
router.get("/profiledata", userVerification, profileData);
router.post("/userdata", userVerification, profileData);
router.post(
  "/updateProfile",
  userVerification,
  upload.single("image"),
  UpdateProfile
);

router.post("/updateVaccinations", userVerification, UpdateVaccinations);

module.exports = router;
