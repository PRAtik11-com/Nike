const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true },
}, {
  timestamps: true,
});

const OtpModel = mongoose.model("Otp", otpSchema);
module.exports = OtpModel;
