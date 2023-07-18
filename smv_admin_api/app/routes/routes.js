const express = require("express");
const router = express.Router();
const controllerAdmin = require("../controllers/controllerAdmin.js");
const controllerUsuariosPrestamistas = require("../controllers/controllerUsuariosPrestamistas.js");
const controllerNivelFidelidad = require("../controllers/controllerNivelFidelidad.js");
const controllerTipoSuscripcion = require("../controllers/controllerTipoSuscripcion.js");
const { verifyToken } = require("../middlewares/authJwt");
const multer = require("multer"); // Importar multer
const upload = multer(); // Crear una instancia de multer

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
router.get("/admin-allusuarios-prestamistas", verifyToken, (req, res) => {
  controllerUsuariosPrestamistas.findAllUsuariosPrestamista(req, res);
});

//obtener todos los usuarios prestamistas activos de la base de datos
router.get(
  "/admin-allusuarios-prestamistas-activos",
  verifyToken,
  (req, res) => {
    controllerUsuariosPrestamistas.findAllUsuariosPrestamistaActivos(req, res);
  }
);

//obtener todos los usuarios prestamistas inactivos de la base de datos
router.get(
  "/admin-allusuarios-prestamistas-inactivos",
  verifyToken,
  (req, res) => {
    controllerUsuariosPrestamistas.findAllUsuariosPrestamistaInactivos(req, res);
  }
);

//obtener todos los usuarios prestamistas eliminados de la base de datos
router.get(
  "/admin-allusuarios-prestamistas-eliminados",
  verifyToken,
  (req, res) => {
    controllerUsuariosPrestamistas.findAllUsuariosPrestamistaEliminados(req, res);
  }
);

// crear un nuevo usuario de tipo prestamista
router.post("/admin-new-usuario-prestamista", verifyToken, (req, res) => {
  controllerUsuariosPrestamistas.createUsuarioPrestamista(req, res);
});

// Eliminar un usuario de tipo prestamista
router.delete("/admin-del-usuario-prestamista/:id", verifyToken, (req, res) => {
  controllerUsuariosPrestamistas.deleteUsuarioPrestamista(req, res);
});

// Actualizar un usuario de tipo prestamista
router.put("/admin-update-usuario-prestamista/:id", verifyToken, (req, res) => {
  controllerUsuariosPrestamistas.updateUsuarioPrestamista(req, res);
});

// setear la imagen
const validImageTypes = ["image/jpeg", "image/png", "image/gif"]; // Tipos de imágenes válidos

router.post(
  "/admin-update-image/:id",
  verifyToken,
  upload.single("image"),
  (req, res) => {
    const image = req.file; // Datos de la imagen
    const id = req.params.id;

    // Comprobar si se proporcionó una imagen
    if (!image) {
      return res.status(400).send({ message: "Debes subir una imagen" });
    }

    // Comprobar el tipo de la imagen
    if (!validImageTypes.includes(image.mimetype)) {
      return res.status(400).send({ message: "Tipo de imagen no válido" });
    }

    controllerAdmin.setImageAdmin(req, res, id, image);
  }
);

//obtener la imagen de perfil del administrador
router.get("/admin-get-image/:id", verifyToken, (req, res) => {
  controllerAdmin.getImageAdmin(req, res);
});


// obtener la tabla de niveles de fidelidad
router.get("/admin-get-niveles-fidelidad", verifyToken, (req, res) => {
  controllerNivelFidelidad.getNivelesFidelidad(req, res);
});

//actualizar el nivel de fidelidad /admin-update-nivel-fidelidad/${id}
router.put("/admin-update-nivel-fidelidad/:id", verifyToken, (req, res) => {
  controllerNivelFidelidad.updateNivelFidelidadByID(req, res);
});

//eliminar el nivel de fidelidad /admin-delete-nivel-fidelidad/${id}
router.delete("/admin-delete-nivel-fidelidad/:id", verifyToken, (req, res) => {
  controllerNivelFidelidad.deleteNivelFidelidadByID(req, res);
});

//crear un nuevo nivel de fidelidad /admin-add-nivel-fidelidad
router.post("/admin-add-nivel-fidelidad", verifyToken, (req, res) => {
  controllerNivelFidelidad.createNivelFidelidad(req, res);
});


// obtener la tabla de tipos de suscripción
router.get("/admin-get-tipos-suscripcion", verifyToken, (req, res) => {
  controllerTipoSuscripcion.getTiposSuscripcion(req, res);
});

//actualizar el tipo de suscripción
router.put("/admin-update-tipo-suscripcion/:id", verifyToken, (req, res) => {
  controllerTipoSuscripcion.updateTipoSuscripcionByID(req, res);
});

//eliminar el tipo de suscripción
router.delete("/admin-delete-tipo-suscripcion/:id", verifyToken, (req, res) => {
  controllerTipoSuscripcion.deleteTipoSuscripcionByID(req, res);
});

//crear un nuevo tipo de suscripción
router.post("/admin-add-tipo-suscripcion", verifyToken, (req, res) => {
  controllerTipoSuscripcion.createTipoSuscripcion(req, res);
});

//obtener todos los tipos de suscripciones
router.get("/admin-get-all-tipos-suscripciones-activas", verifyToken, (req, res) => {
  controllerTipoSuscripcion.getAllTiposSuscripcionesActivas(req, res);
});

//setear imagen del usuario prestamista
router.post("/admin-upload-usuario-prestamista-image/:id", verifyToken, upload.single("image"), (req, res) => {
controllerUsuariosPrestamistas.setImagePrestamista(req, res);
});


module.exports = router;
