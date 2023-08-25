const jwt = require("jsonwebtoken");

// Verify token middleware
function verifyToken(req, res, next) {
  const TOKEN_KEY = process.env.JWT_PRIVATE_KEY;
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token." });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido." });
  }
}

module.exports = {
  verifyToken,
};
