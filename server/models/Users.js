const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  phone: { type: Number, required: true, min: 1000000000, max: 9999999999 },
  email: { type: String },
  password: { type: String, required: true },
  banned: { type: Boolean },
});

const UserModel = mongoose.model("UsersCollection", UserSchema);

module.exports = UserModel;
