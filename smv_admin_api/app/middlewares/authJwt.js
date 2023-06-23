const jwt = require("jsonwebtoken");
const TOKEN_KEY = "Z4najdPy7Ji7I21FHi2Hv4GfKvu0lixz";

//verificar token
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({
      message: "No se proporcionó un token.",
    });

  jwt.verify(token, TOKEN_KEY, (err, decoded) => {
    if (err)
      return res.status(401).send({
        message: "No autorizado.",
      });
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
