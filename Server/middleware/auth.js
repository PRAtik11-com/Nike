const jwt = require("jsonwebtoken");
require("dotenv").config();

function Auth(req, res, next) {
  const token = req.cookies?.auth_token; 

  if (!token) {
    return res.status(400).json({ message: "Please signin first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    if (!decoded) {
      return res.status(400).json({ message: "Token is Invalid" });
    }

    req.user = decoded; // contains id and email
    next();
  } catch (error) {
    return res.status(400).json({ message: error?.message });
  }
}

module.exports = Auth;
