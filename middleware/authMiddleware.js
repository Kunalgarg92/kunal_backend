const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key"; // Replace with a secure key

function authenticate(req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = authenticate;
