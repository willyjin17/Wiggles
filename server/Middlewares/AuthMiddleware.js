require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");


module.exports.userVerification = (req, res) => {
    const token = req.cookies.token
    if (!token) {
      return res.json({ status: false })
    }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } 
    else {
      const user = await UserModel.findOne({email:data.email})
      if (user) return res.json({ status: true, user: user.email })
      else return res.json({ status: false })
    }
  })
}