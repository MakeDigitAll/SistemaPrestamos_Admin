const jwt = require("jsonwebtoken");

// Verify token middleware
const verifyToken = (req, res, next) => {
  TOKEN_KEY = process.env.JWT_PRIVATE_KEY;
  const cookieHeader = req.headers.cookie;
  const cookies = cookieHeader ? cookieHeader.split("; ") : [];
  let accessToken, refreshToken;

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === "accessToken") {
      accessToken = value;
    } else if (name.trim() === "refreshToken") {
      refreshToken = value;
    }
  }

  if (!accessToken) {
    return res.status(403).send({
      message: "No se proporcionó un token.",
    });
  }

  jwt.verify(accessToken, TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "No autorizado.",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = {
  verifyToken,
};
