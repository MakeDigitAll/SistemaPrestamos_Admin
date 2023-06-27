const db = require("../models");
const usuarios = db.usuarios;
const jwt = require("jsonwebtoken");
const TOKEN_KEY = "a4najdPy7Ji3I21Fai2Hv4GfKvu0lixZ";

// obtener todos los usuarios de tipo prestamista (tipoUsuario = Prestamista)

exports.findAllUsuariosPrestamista = (req, res) => {
  usuarios
    .findAll({ where: { tipoUsuario: "Prestamista" } }) // Filtrar usuarios por tipo "Prestamista"
    .then((data) => {
      const usuarios = data.map((user) => ({
        // Cambiar el nombre de la variable para evitar conflicto con la importación anterior
        idUsuario: user.idUsuario,
        correoElectronico: user.correoElectronico,
        nombres: user.nombres,
        apellidos: user.apellidos,
        codigoReferencia: user.codigoReferencia,
        tipoUsuario: user.tipoUsuario,
      }));
      const tokenUsuarios = jwt.sign({ usuarios }, TOKEN_KEY);
      res.send({ tokenUsuarios });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los usuarios.",
      });
    });
};

exports.findAllUsuariosAfiliado = (req, res) => {
  usuarios
    .findAll({ where: { tipoUsuario: "Afiliado" } }) // Filtrar usuarios por tipo "Prestamista"
    .then((data) => {
      const usuarios = data.map((user) => ({
        // Cambiar el nombre de la variable para evitar conflicto con la importación anterior
        idUsuario: user.idUsuario,
        correoElectronico: user.correoElectronico,
        nombres: user.nombres,
        apellidos: user.apellidos,
        codigoReferencia: user.codigoReferencia,
        tipoUsuario: user.tipoUsuario,
      }));
      const tokenUsuarios = jwt.sign({ usuarios }, TOKEN_KEY);
      res.send({ tokenUsuarios });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los usuarios.",
      });
    });
};
