require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");


// module.exports.userVerification = (req, res ) => {
//     const token = req.cookies.token
//     if (!token) {
//       return res.json({ status: false })
//     }

//   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, data) => {
//     if (err) {
//      return res.json({ status: false })
//     } 
//     else {
//       const user = await UserModel.findOne({email:data.email})
//       if (user) return res.json({ status: true, user: user.email })
//       else return res.json({ status: false })
//     }
//   })
// }



module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await UserModel.findOne({ email: decodedToken.email });

      if (user) {
          req.user = user; // Attach user object to the request for further use
        //   console.log(req.path)
        if(req.path !== "/"){ 
            next(); // User authorized, proceed to the next middleware or route handler
        }else
          return res.json({ status: "ok", user: user.email })

      } else {
          return res.status(401).json({ status: false, message: "Unauthorized" });
      }
  } catch (err) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
  }
};
















