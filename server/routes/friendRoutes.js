const router = require("express").Router();
const {
  addFriend,
  requestDeclined,
  requestAccepted,
  Friends,
  removeFriend,
} = require("../controllers/friendController");
const { userVerification } = require("../middleware/authMiddleware");

router.post("/friends", userVerification, Friends);
router.post("/addFriend", userVerification, addFriend);
router.post("/requestaccepted", userVerification, requestAccepted);
router.post("/requestdeclined", userVerification, requestDeclined);
router.post("/removeFriend", userVerification, removeFriend);

module.exports = router;
