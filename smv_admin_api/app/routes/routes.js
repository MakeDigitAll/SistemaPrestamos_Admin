const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");
const { verifyToken } = require("../middlewares/authJwt");

// Obtener todos los administradores de la base de datos (solo pruebas)
router.get("/administradores", verifyToken, (req, res) => {
  controller.findAll(req, res);
});

// Crear y guardar un nuevo administrador
router.post("/administradores", verifyToken, (req, res) => {
  controller.create(req, res);
});

// Verificar si el administrador existe en la base de datos y si la contraseña es correcta
router.get("/administradores/login", (req, res) => {
  controller.login(req, res);
});

module.exports = router;
