const db = require("../models");
const { aesDecrypt } = require("../utils/cryptoUtils");
const jwt = require("jsonwebtoken");
const nivelesFidelidad = db.nivelesFidelidad;

// obtener todos los niveles de fidelidad de la base de datos que no son isDeleted = true
exports.getNivelesFidelidad = (req, res) => {
  TOKEN_KEY = process.env.JWT_PRIVATE_KEY;
  nivelesFidelidad
    .findAll({
      where: {
        isDeleted: false,
      },
    })
    .then((data) => {
      const nivelesFidelidad = data.map((nivel) => ({
        idNivelFidelidad: nivel.idNivelFidelidad,
        nombreNivelFidelidad: nivel.nombreNivelFidelidad,
        descuento: nivel.descuento,
        numeroMesesMinimo: nivel.numeroMesesMinimo,
        numeroMesesMaximo: nivel.numeroMesesMaximo,
        isUpdated: nivel.isUpdated,
      }));
      const tokenNivelesFidelidad = jwt.sign({ nivelesFidelidad }, TOKEN_KEY);
      res.send({ tokenNivelesFidelidad });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los nivelesFidelidad.",
      });
      console.log(err);
    });
};

// Crear y guardar un nuevo administrador
exports.updateNivelFidelidadByID = (req, res) => {
  const id = req.params.id;
  const decryptedNombre = aesDecrypt(req.body.nombreNivelFidelidad);
  const decryptedDescuento = aesDecrypt(req.body.descuento);
  const decryptedNumeroMesesMinimo = aesDecrypt(req.body.numeroMesesMinimo);
  const decryptedNumeroMesesMaximo = aesDecrypt(req.body.numeroMesesMaximo);

  nivelesFidelidad
    .update(
      {
        nombreNivelFidelidad: decryptedNombre,
        descuento: decryptedDescuento,
        numeroMesesMinimo: decryptedNumeroMesesMinimo,
        numeroMesesMaximo: decryptedNumeroMesesMaximo,
        isUpdated: true,
      },
      {
        where: { idNivelFidelidad: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Nivel de fidelidad actualizado correctamente.",
        });
      } else {
        res.send({
          message: `No se puede actualizar el nivel de fidelidad con id=${id}. Tal vez el nivel de fidelidad no fue encontrado o req.body está vacío!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al actualizar el nivel de fidelidad" + err,
      });
    });
};

//Actualizar el nivel de fidelidad a isDeleted = true
exports.deleteNivelFidelidadByID = (req, res) => {
  const id = req.params.id;

  nivelesFidelidad
    .update(
      {
        isDeleted: true,
      },
      {
        where: { idNivelFidelidad: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Nivel de fidelidad eliminado correctamente.",
        });
      } else {
        res.send({
          message: `No se puede eliminar el nivel de fidelidad con id=${id}. Tal vez el nivel de fidelidad no fue encontrado o req.body está vacío!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al eliminar el nivel de fidelidad" + err,
      });
    });
};

//crear y guardar un nuevo nivel de fidelidad
exports.createNivelFidelidad = (req, res) => {
  TOKEN_KEY = process.env.JWT_PRIVATE_KEY;
  const decryptedNombre = aesDecrypt(req.body.nombreNivelFidelidad);
  const decryptedDescuento = aesDecrypt(req.body.descuento);
  const decryptedNumeroMesesMinimo = aesDecrypt(req.body.numeroMesesMinimo);
  const decryptedNumeroMesesMaximo = aesDecrypt(req.body.numeroMesesMaximo);

  nivelesFidelidad
    .create({
      nombreNivelFidelidad: decryptedNombre,
      descuento: decryptedDescuento,
      numeroMesesMinimo: decryptedNumeroMesesMinimo,
      numeroMesesMaximo: decryptedNumeroMesesMaximo,
      isUpdated: false,
      isDeleted: false,
    })
    .then((data) => {
      const tokenNivelFidelidad = jwt.sign({ data }, TOKEN_KEY);
      res.send({ tokenNivelFidelidad });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear el nivel de fidelidad.",
      });
      console.log(err);
    });
};
