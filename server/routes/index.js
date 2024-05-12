const router = require("express").Router();
const { userVerification } = require('../middleware/authMiddleware')
const { notifications } = require("../controllers/notificationController");
const authRoutes = require("./authRoutes");
const friendRoutes = require("./friendRoutes");
const qrRoutes = require("./qrRoutes");
const userRoutes = require("./userRoutes");


router.get('/',userVerification)

router.get('/notifications',userVerification,notifications)

router.use("/", authRoutes);
router.use("/", friendRoutes);
router.use("/", qrRoutes);
router.use("/", userRoutes);


module.exports = router;