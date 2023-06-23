const jwt = require("jsonwebtoken");
const TOKEN_KEY = "a4najdPy7Ji3I21Fai2Hv4GfKvu0lixZ";

// Verify token middleware
const verifyToken = (req, res, next) => {
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

  console.log("accessToken:", accessToken);
  console.log("refreshToken:", refreshToken);

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
