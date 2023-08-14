const { Login } = require('../Controllers/AuthController')
const { ChangePassword } = require('../Controllers/AuthController')
const { profileData } = require('../Controllers/UserData')
const { Data } = require('../Controllers/UserData')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const router = require("express").Router();

router.post('/login', Login)
router.post('/resetPassword', ChangePassword)
router.get('/profiledata',profileData)
router.get('/data',Data)
router.post('/',userVerification)

module.exports = router;
