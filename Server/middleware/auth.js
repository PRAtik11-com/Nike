const jwt = require("jsonwebtoken");
require("dotenv").config();
function Auth(req, res, next) {
  if (!req.cookies.access_token) {
    return res.status(400).json({ message: "Please signin first" });
  }
  try {
    var decoded = jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    if (!decoded) {
      return res.status(400).json({ message: "Token is Invalid" });
    }
    req.user = decoded?.userData;
    next();
  } catch (error) {
    return res.status(400).json({ message: error?.message });
  }
}

module.exports = Auth;
