const router = require("express").Router();
const {QrData, QrSwitch, QrCode} = require("../controllers/QRController")
const { userVerification } = require("../middleware/authMiddleware");

router.post("/qrData", userVerification, QrData);
router.post("/qrSwitch", userVerification, QrSwitch);
router.post("/qr-code", userVerification, QrCode);

module.exports = router;
