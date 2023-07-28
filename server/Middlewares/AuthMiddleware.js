require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }

  jwt.verify(token, 'secret123', async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } 
    else {
      const user = await User.findById(data.email)
      if (user) return res.json({ status: true, user: user.email })
      else return res.json({ status: false })
    }
  })
}