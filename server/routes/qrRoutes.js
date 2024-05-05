const router = require("express").Router();
const { QrCode, QrSwitch, QrData } = require("../Controllers/QRController");
const { userVerification } = require("../middleware/authMiddleware");

router.post("/qrData", userVerification, QrData);
router.post("/qrSwitch", userVerification, QrSwitch);
router.post("/qr-code", userVerification, QrCode);

module.exports = router;
