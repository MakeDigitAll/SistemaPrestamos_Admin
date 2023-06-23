const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");
const { verifyToken } = require("../middlewares/authJwt");

// Verificar si el administrador existe en la base de datos y si la contraseña es correcta
router.get("/administradores/login", (req, res) => {
  controller.login(req, res);
});

//refrescar token
router.get("/administradores/refreshToken", (req, res) => {
  controller.refreshToken(req, res);
});

// Obtener todos los administradores de la base de datos (solo pruebas)
router.get("/administradores", verifyToken, (req, res) => {
  controller.findAll(req, res);
});

// Crear y guardar un nuevo administrador
router.post("/administradores", verifyToken, (req, res) => {
  controller.create(req, res);
});

// Obtener un administrador por id
router.get("/administradores/:id", verifyToken, (req, res) => {
  controller.refreshToken(req, res);
});

module.exports = router;
