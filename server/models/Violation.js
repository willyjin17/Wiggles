//schema for violation of community guidelines
const mongoose = require("mongoose");

const ViolationSchema = new mongoose.Schema(
  {
    warn: { type: Boolean, default: false },
    warnings: { type: Number, default: 0 },
    ban: { type: Boolean, default: false },
    violationMessage: { type: String },
  },
  { timestamps: true }
);

const ViolationModel = mongoose.model("Violation", ViolationSchema);

module.exports = { ViolationSchema, ViolationModel };
