const express = require("express");
const router = express.Router();
const controllerAdmin = require("../controllers/controllerAdmin.js");
const controllerUsuarios = require("../controllers/controllerUsuarios.js");
const { verifyToken } = require("../middlewares/authJwt");

// Verificar si el administrador existe en la base de datos y si la contraseña es correcta
router.get("/admin/login", (req, res) => {
  controllerAdmin.loginAdmin(req, res);
});

// Refrescar token
router.get("/admin/refreshToken", (req, res) => {
  controllerAdmin.refreshTokenAdmin(req, res);
});

// actalizar un administrador
router.put("/admin/:id", verifyToken, (req, res) => {
  controllerAdmin.updateAdmin(req, res);
});

// obtener todos los usuarios prestamistas de la base de datos
router.get("/admin-usuarios-prestamistas", verifyToken, (req, res) => {
  controllerUsuarios.findAllUsuariosPrestamista(req, res);
});

// crear un nuevo usuario de tipo prestamista
router.post("/admin-new-usuario-prestamista", verifyToken, (req, res) => {
  controllerUsuarios.createUsuarioPrestamista(req, res);
});

// Eliminar un usuario de tipo prestamista
router.delete("/admin-del-usuario-prestamista/:id", verifyToken, (req, res) => {
  controllerUsuarios.deleteUsuarioPrestamista(req, res);
});

// Actualizar un usuario de tipo prestamista
router.put("/admin-update-usuario-prestamista/:id", verifyToken, (req, res) => {
  controllerUsuarios.updateUsuarioPrestamista(req, res);
});

module.exports = router;
