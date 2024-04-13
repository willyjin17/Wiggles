const router = require("express").Router();
const { Login, Register, SecondaryRegister,Logout, CheckRegister } = require('../controllers/authController')
const { ChangePassword } = require('../controllers/authController')
const { userVerification } = require('../middleware/authMiddleware')
const { profileData, Data, UpdateProfile  } = require('../controllers/userController')
const { addFriend, requestDeclined, requestAccepted ,Friends,removeFriend} = require('../controllers/friendController')
const { notifications } = require("../controllers/notificationController");
const { UpdateVaccinations } = require("../controllers/vaccinationController");
const { QrCode, QrSwitch, QrData } = require("../Controllers/QRController");
const multer = require("multer");

const storage = multer.diskStorage({})

const upload = multer({storage:storage})


router.get('/',userVerification)

router.post('/login', Login)
router.post('/checkRegister', CheckRegister)
router.post('/register',upload.single("image"), Register, SecondaryRegister)
router.post('/resetPassword', ChangePassword)
router.post('/logout',Logout)

router.get('/data',userVerification,Data)
router.get('/profiledata',userVerification,profileData)
router.post('/userdata',profileData)

router.post("/updateProfile",upload.single("image"),UpdateProfile);
router.post('/updateVaccinations',userVerification, UpdateVaccinations);

router.post('/qrData',QrData)
router.post('/qrSwitch',QrSwitch)
router.post('/qr-code',userVerification,QrCode) 

router.post('/friends',userVerification,Friends)
router.post('/addFriend',addFriend)
router.post('/requestaccepted',requestAccepted) 
router.post('/requestdeclined',requestDeclined)
router.post('/removeFriend',removeFriend)

router.get('/notifications',userVerification,notifications)

module.exports = router;