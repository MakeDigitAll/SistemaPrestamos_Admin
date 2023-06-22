const db = require("../models");
const admin = db.administradores;

// Crear y guardar un nuevo administrador
exports.create = (req, res) => {
  if (!req.query.nombres) {
    res.status(400).send({
      message: "El Nombre no puede estar vacío!",
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

  // Crear un administrador en la base de datos
  const administrador = {
    nombres: req.query.nombres,
    apellidos: req.query.apellidos,
    correo_electronico: req.query.correo_electronico,
    passwd: req.query.passwd,
    estado: req.query.estado ? req.query.estado : false,
  };

  // Guardar administrador en la base de datos
  admin
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

exports.findAll = (req, res) => {
  //obtener todos los administradores de la base de datos
  admin
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al obtener los administradores de la base de datos.",
      });
    });
};

// Actualizar solo la contraseña de un administrador identificado por el id en la solicitud
exports.update = (req, res) => {
  //actualizar la contraseña de un administrador en la base de datos por su id
  const id = req.query.id;
  admin
    .update(
      {
        passwd: req.query.passwd,
      },
      {
        where: { id: id },
      }
    )
    .then((data) => {
      if (data == 1) {
        res.send({
          message:
            "La contraseña del administrador fue actualizada exitosamente!",
        });
      } else {
        res.send({
          message: `No se pudo actualizar la contraseña del administrador con id=${id}. Tal vez el administrador no exista!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al actualizar la contraseña del administrador con id=" +
            id,
      });
    });
};

// Eliminar un administrador con el id especificado en la solicitud
exports.delete = (req, res) => {
  //eliminar un administrador de la base de datos por su id
  const id = req.query.id;
  admin
    .destroy({
      where: { id: id },
    })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "El administrador fue eliminado exitosamente!",
        });
      } else {
        res.send({
          message: `No se pudo eliminar el administrador con id=${id}. Tal vez el administrador no exista!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al eliminar el administrador con id=" + id,
      });
    });
};

// Verificar si el administrador existe en la base de datos y si es asi verifica que la contraseña es correcta
exports.login = (req, res) => {
  admin
    .findOne({
      where: {
        correo_electronico: req.query.correo_electronico,
      },
    })
    .then((data) => {
      if (data) {
        // El correo existe en la base de datos, verificar la contraseña
        if (data.passwd === req.query.passwd) {
          res.send(data); // Contraseña válida, enviar los datos del administrador
        } else {
          console.log("Contraseña incorrecta");
          //crear un error personalizado para enviarlo al cliente
          res.status(500).send({
            message: "Contraseña incorrecta",
          });
        }
      } else {
        res.status(500).send({
          message: "Correo no registrado",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al comprobar si el administrador existe en la base de datos.",
      });
    });
};
