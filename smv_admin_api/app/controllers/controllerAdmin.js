const db = require("../models");
const admin = db.administradores;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
//token key 32
const TOKEN_KEY = "a4najdPy7Ji3I21Fai2Hv4GfKvu0lixZ";
const { aesDecrypt } = require("../utils/cryptoUtils");
const imagenAdministrador = db.imagenAdministrador;

// Crear y guardar un nuevo administrador
exports.createAdmin = (req, res) => {
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
  if (!req.query.correoElectronico) {
    res.status(400).send({
      message: "El Correo Electronico no puede estar vacío!",
    });
    return;
  }
  if (!req.query.adminPassword) {
    res.status(400).send({
      message: "La Contraseña no puede estar vacía!",
    });
    return;
  }

  // Crear un administrador en la base de datos
  const administrador = {
    nombres: req.query.nombres,
    apellidos: req.query.apellidos,
    correoElectronico: req.query.correoElectronico,
    adminPassword: req.query.adminPassword,
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

// Actualizar los datos de un administrador por su id  http.put(`/administradores/${id}`, data);
exports.updateAdmin = (req, res) => {
  const id = req.params.id;

  admin
    .update(req.query, {
      where: { idAdministrador: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Administrador actualizado correctamente.",
        });
      } else {
        res.send({
          message: `No se puede actualizar el administrador con id=${id}. Tal vez el administrador no fue encontrado o req.body está vacío!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al actualizar el administrador" + err,
      });
    });
};

// Verificar si el administrador existe en la base de datos y si es asi verifica que la contraseña es correcta
exports.loginAdmin = (req, res) => {
  // Desencriptar el correo y la contraseña
  const decryptedEmail = aesDecrypt(req.query.correoElectronico).toLowerCase();
  const decryptedPassword = aesDecrypt(req.query.adminPassword);
  admin
    .findOne({
      where: {
        correoElectronico: {
          [Op.iLike]: `%${decryptedEmail}%`,
        },
      },
    })
    .then((data) => {
      if (data) {
        // El correo existe en la base de datos, verificar la contraseña
        if (data.adminPassword === decryptedPassword) {
          const datos = {
            id: data.idAdministrador,
            nombres: data.nombres,
            apellidos: data.apellidos,
            correoElectronico: data.correoElectronico,
          };
          const accessToken = jwt.sign(datos, TOKEN_KEY, { expiresIn: "1h" });
          const refreshToken = jwt.sign(datos, TOKEN_KEY, { expiresIn: "7d" });

          let datosToken = {
            ...datos,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };

          res.status(200).send(datosToken);
        } else {
          console.log("Contraseña incorrecta");
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
      console.log(err);
    });
};

//refrescar el token de acceso
exports.refreshTokenAdmin = (req, res) => {
  // Obtener el token de actualización del cuerpo de la solicitud
  const refreshToken = req.query.refreshToken;

  // Si no hay token de actualización en el cuerpo de la solicitud, enviar un error
  if (!refreshToken) {
    res.status(403).send({
      message: "No se proporcionó el token de actualización",
    });
    return;
  }

  // Verificar el token de actualización
  jwt.verify(refreshToken, TOKEN_KEY, (err, decoded) => {
    // Si hay un error, enviar un error
    if (err) {
      res.status(403).send({
        message: "El token de actualización no es válido",
      });
      return;
    }

    // Si el token de actualización es válido, crear un nuevo token de acceso y enviarlo al cliente
    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        nombres: decoded.nombres,
        apellidos: decoded.apellidos,
        correoElectronico: decoded.correoElectronico,
      },
      TOKEN_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      accessToken: newAccessToken,
    });
  });
};

//actualizar la  imagen de perfil del administrador
exports.setImageAdmin = (req, res) => {
  const id = req.params.id;
  const image = req.file.buffer; // Accedemos al buffer de la imagen

  //buscar la imagen del administrador en la tabla imagenAdministrador por el id del administrador y si existe la imagen la actualiza, si no existe la imagen la crea
  imagenAdministrador
    .findOne({
      where: {
        idAdministrador: id,
      },
    })
    .then((data) => {
      if (data) {
        //actualizar la imagen del administrador
        imagenAdministrador
          .update(
            {
              imagen: image,
            },
            {
              where: { idAdministrador: id },
            }
          )
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Imagen actualizada correctamente.",
              });
            } else {
              res.send({
                message: `No se puede actualizar la imagen del administrador con id=${id}. Tal vez la imagen no fue encontrada o req.body está vacío!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error al actualizar la imagen del administrador" + err,
            });
          });
      } else {
        //crear la imagen del administrador
        const imagen = {
          idAdministrador: id,
          imagen: image,
        };

        imagenAdministrador
          .create(imagen)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Ocurrió un error al crear la imagen del administrador.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al buscar la imagen del administrador.",
      });
    });
};

//obtener la imagen de perfil del administrador de la base de datos (BLOB)
exports.getImageAdmin = (req, res) => {
  const id = req.params.id;

  imagenAdministrador
    .findOne({
      where: {
        idAdministrador: id,
      },
    })
    .then((data) => {
      if (data) {
        res.send(data.imagen);
      } else {
        res.status(500).send({
          message: "No se encontró la imagen del administrador",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al buscar la imagen del administrador.",
      });
    });
};
