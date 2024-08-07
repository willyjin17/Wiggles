const router = require("express").Router();
const {QrData, QrSwitch, QrCode} = require("../controllers/QRController")
const { userVerification, temp } = require("../middleware/authMiddleware");

router.post("/qrData", temp, QrData);
router.post("/qrSwitch", userVerification, QrSwitch);
router.post("/qr-code", userVerification, QrCode);

module.exports = router;
