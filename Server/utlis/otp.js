const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function CreateOtpAndToken(userData, expiresInSeconds) {
  const otp = otpGenerator.generate(8, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const token = jwt.sign({ userData, otp }, process.env.PRIVATE_KEY, {
    expiresIn: expiresInSeconds, 
  });

  return { otp, token, expiresInSeconds };
}

module.exports = CreateOtpAndToken;
