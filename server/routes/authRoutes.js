const router = require("express").Router();
const {
  Login,
  Register,
  SecondaryRegister,
  Logout,
  CheckRegister,
  ChangePassword,
} = require("../controllers/authController");

const multer = require("multer");
const storage = multer.diskStorage({})
const upload = multer({storage:storage})

router.post("/login", Login);
router.post("/checkRegister", CheckRegister);
router.post("/register", upload.single("image"), Register, SecondaryRegister);
router.post("/resetPassword", ChangePassword);
router.post("/logout", Logout);

module.exports = router;