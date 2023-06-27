const express = require("express");
const router = express.Router();
const controllerAdmin = require("../controllers/controllerAdmin.js");
const controllerUsuarios = require("../controllers/controllerUsuarios.js");
const { verifyToken } = require("../middlewares/authJwt");

// Verificar si el administrador existe en la base de datos y si la contraseña es correcta
router.get("/administradores/login", (req, res) => {
  controllerAdmin.loginAdmin(req, res);
});

// Refrescar token
router.get("/administradores/refreshToken", (req, res) => {
  controllerAdmin.refreshTokenAdmin(req, res);
});

// actalizar un administrador
router.put("/administradores/:id", verifyToken, (req, res) => {
  controllerAdmin.updateAdmin(req, res);
});

// obtener todos los usuarios de la base de datos
router.get("/usuarios-prestamistas", verifyToken, (req, res) => {
  controllerUsuarios.findAllUsuariosPrestamista(req, res);
});

module.exports = router;
