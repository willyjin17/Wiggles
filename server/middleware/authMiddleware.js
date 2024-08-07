require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findOne({ _id: decodedToken.id });

    if (user) {
      req.user = decodedToken; // Attach user object to the request for further use
      if (req.path !== "/") {
        next(); // User authorized, proceed to the next middleware or route handler
      } else return res.json({ status: "ok", user: user.email });
    } else {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
  } catch (err) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }
};

module.exports.temp = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    next();
    return;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findOne({ _id: decodedToken.id });

    if (user) {
      req.user = decodedToken;
      if (req.path !== "/") {
        next();
        return;
      } else {
        return res.json({ status: "ok", user: user.email });
      }
    } else {
      next();
      return;
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};
