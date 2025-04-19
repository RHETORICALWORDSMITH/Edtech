const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = (req, res, next) => {
  // Check if user is authenticated via passport
  if (req.isAuthenticated()) {
    return next();
  }

  // For JWT authentication, check authorization header or token cookie
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = { _id: decoded.userid, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
