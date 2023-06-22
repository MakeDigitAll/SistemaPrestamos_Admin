const db = require("../models");
const Administradores = db.administradores;
const Op = db.Sequelize.Op;

// Create and Save a new
exports.create = (req, res) => {
  if (!req.query.nombres) {
    res.status(400).send({
      message: "El Nomre no puede estar vacío!",
    });
    return;
  }
  if (!req.query.apellidos) {
    res.status(400).send({
      message: "Los Apellidos no puede estar vacío!",
    });
    return;
  }
  if (!req.query.correo_electronico) {
    res.status(400).send({
      message: "El Correo Electronico no puede estar vacío!",
    });
    return;
  }
  if (!req.query.passwd) {
    res.status(400).send({
      message: "La Contraseña no puede estar vacía!",
    });
    return;
  }

  // Create a
  const administrador = {
    nombres: req.query.nombres,
    apellidos: req.query.apellidos,
    correo_electronico: req.query.correo_electronico,
    passwd: req.query.passwd,
    estado: req.query.estado ? req.query.estado : false,
  };

  // Save in the database
  db.administradores
    .create(administrador)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el administrador.",
      });
    });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {};

// Find a single with an id
exports.findOne = (req, res) => {};

// Update a with the specified id in the request
exports.update = (req, res) => {};

// Delete a with the specified id in the request
exports.delete = (req, res) => {};
