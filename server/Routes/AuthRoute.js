const router = require("express").Router();
const { Login } = require('../Controllers/AuthController')
const { ChangePassword } = require('../Controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const { profileData, Data } = require('../Controllers/UserData')
const { addFriend, requestDeclined, requestAccepted } = require('../Controllers/UserData')
const { notifications } = require('../Controllers/UserData')

router.post('/',userVerification)
router.post('/login', Login)
router.post('/resetPassword', ChangePassword)
router.get('/data',Data)
router.post('/profiledata',profileData)
router.post('/addFriend',addFriend)
router.post('/requestaccepted',requestAccepted)
router.post('/requestdeclined',requestDeclined)
router.get('/notifications',notifications)

module.exports = router;
