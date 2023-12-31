const db = require("../models");
const { aesDecrypt } = require("../utils/cryptoUtils");
const jwt = require("jsonwebtoken");
const tipoSuscripcion = db.tipoSuscripciones;

// Crear y guardar un nuevo administrador
exports.updateTipoSuscripcionByID = async (req, res) => {
  const id = req.params.id;
  const decryptedNombre = aesDecrypt(req.body.nombreSuscripcion);
  const decryptedMontoDesde = aesDecrypt(req.body.montoDesde);
  const decryptedNumeroMontoHasta = aesDecrypt(req.body.montoHasta);
  const decryptedNumeroUsuariosMax = aesDecrypt(req.body.numeroUsuariosMax);
  const decryptedCostoMembresia = aesDecrypt(req.body.costoMembresia);

  await tipoSuscripcion
    .update(
      {
        nombreSuscripcion: decryptedNombre,
        montoDesde: decryptedMontoDesde,
        montoHasta: decryptedNumeroMontoHasta,
        numeroUsuariosMax: decryptedNumeroUsuariosMax,
        costoMembresia: decryptedCostoMembresia,
        isUpdated: true,
      },
      {
        where: { idTipoSuscripcion: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Nivel de tipo de suscripcion actualizado correctamente.",
        });
      } else {
        res.send({
          message: `No se puede actualizar el tipo de suscripcion con id=${id}. Tal vez el tipo de suscripcion no fue encontrado o req.body está vacío!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al actualizar el tipo de suscripcion" + err,
      });
    });
};

//Actualizar el tipoSuscripcion de tipo de suscripcion a isDeleted = true
exports.deleteTipoSuscripcionByID = async (req, res) => {
  const id = req.params.id;

  await tipoSuscripcion
    .update(
      {
        isDeleted: true,
      },
      {
        where: { idTipoSuscripcion: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Nivel de tipo de suscripcion eliminado correctamente.",
        });
      } else {
        res.send({
          message: `No se puede eliminar el tipoSuscripcion de tipo de suscripcion con id=${id}. Tal vez el tipoSuscripcion de tipo de suscripcion no fue encontrado o req.body está vacío!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error al eliminar el tipoSuscripcion de tipo de suscripcion" + err,
      });
    });
};

//crear y guardar un nuevo tipoSuscripcion de tipo de suscripcion
exports.createTipoSuscripcion = async (req, res) => {
  TOKEN_KEY = process.env.JWT_PRIVATE_KEY;
  // Crear un tipoSuscripcion de tipo de suscripcion
  const decryptedNombre = aesDecrypt(req.body.nombreSuscripcion);
  const decryptedMontoDesde = aesDecrypt(req.body.montoDesde);
  const decryptedMontoHasta = aesDecrypt(req.body.montoHasta);
  const decryptedNumeroUsuariosMax = aesDecrypt(req.body.numeroUsuariosMax);
  const decryptedCostoMembresia = aesDecrypt(req.body.costoMembresia);

  await tipoSuscripcion
    .create({
      nombreSuscripcion: decryptedNombre,
      montoDesde: decryptedMontoDesde,
      montoHasta: decryptedMontoHasta,
      numeroUsuariosMax: decryptedNumeroUsuariosMax,
      costoMembresia: decryptedCostoMembresia,
    })
    .then((data) => {
      const tipoSuscripcion = {
        idTipoSuscripcion: data.idTipoSuscripcion,
        nombreSuscripcion: data.nombreSuscripcion,
        montoDesde: data.montoDesde,
        montoHasta: data.montoHasta,
        numeroUsuariosMax: data.numeroUsuariosMax,
        costoMembresia: data.costoMembresia,
      };
      const tokenTipoSuscripcion = jwt.sign({ tipoSuscripcion }, TOKEN_KEY);
      res.send({ tokenTipoSuscripcion });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al crear el tipoSuscripcion de tipo de suscripcion.",
      });
      console.log(err);
    });
};

//obtener todas las suscripciones activas de la base de datos que no son isDeleted = true
exports.getAllTiposSuscripcionesActivas = async (req, res) => {
  TOKEN_KEY = process.env.JWT_PRIVATE_KEY;
  await tipoSuscripcion
    .findAll({
      where: {
        isDeleted: false,
      },
    })
    .then((data) => {
      const tipoSuscripcion = data.map((tipoSuscripcion) => ({
        idTipoSuscripcion: tipoSuscripcion.idTipoSuscripcion,
        nombreSuscripcion: tipoSuscripcion.nombreSuscripcion,
        montoDesde: tipoSuscripcion.montoDesde,
        montoHasta: tipoSuscripcion.montoHasta,
        numeroUsuariosMax: tipoSuscripcion.numeroUsuariosMax,
        costoMembresia: tipoSuscripcion.costoMembresia,
        isUpdated: tipoSuscripcion.isUpdated,
      }));
      const tokenTipoSuscripciones = jwt.sign({ tipoSuscripcion }, TOKEN_KEY);
      res.send({ tokenTipoSuscripciones });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los tipoSuscripcion.",
      });
      console.log(err);
    });
};
