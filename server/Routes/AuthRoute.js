const router = require("express").Router();
const { Login } = require('../Controllers/AuthController')
const { ChangePassword } = require('../Controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const { profileData, Data, Friends } = require('../Controllers/UserData')
const { addFriend, requestDeclined, requestAccepted } = require('../Controllers/UserData')
const { notifications } = require('../Controllers/UserData')

router.post('/',userVerification)
router.post('/login', Login)
router.post('/resetPassword', ChangePassword)
router.get('/data',userVerification,Data)
router.post('/profiledata',userVerification,profileData)
router.post('/addFriend',addFriend)
router.post('/requestaccepted',requestAccepted) 
router.post('/requestdeclined',requestDeclined)
router.get('/notifications',userVerification,notifications)
router.post('/friends',userVerification,Friends)

module.exports = router;
