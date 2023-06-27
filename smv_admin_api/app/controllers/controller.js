const db = require("../models");
const admin = db.administradores;
const jwt = require("jsonwebtoken");
//token key 32
const TOKEN_KEY = "a4najdPy7Ji3I21Fai2Hv4GfKvu0lixZ";
const CryptoJS = require("crypto-js"); // Importa la biblioteca crypto-js
const secret_key = "ee4fdd88fcc9afaff541caf9652ba6cc";

function aesDecrypt(word) {
  const keys = CryptoJS.enc.Utf8.parse(secret_key);
  const base64 = CryptoJS.enc.Base64.parse(word);
  const src = CryptoJS.enc.Base64.stringify(base64);
  const decrypted = CryptoJS.AES.decrypt(src, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

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

exports.findAll = (req, res) => {
  //obtener todos los administradores de la base de datos
  admin
    .findAll()
    .then((data) => {
      //solo enviar los datos que se necesitan menos la contraseña
      const datos = data.map((admin) => {
        return {
          id: admin.idAdministrador,
          nombres: admin.nombres,
          apellidos: admin.apellidos,
          correoElectronico: admin.correoElectronico,
        };
      });
      res.send(datos);
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
        adminPassword: req.query.adminPassword,
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
  //desencriptar el correo y la contraseña
  const decryptedEmail = aesDecrypt(req.query.correoElectronico);
  const decryptedPassword = aesDecrypt(req.query.adminPassword);
  admin
    .findOne({
      where: {
        correoElectronico: decryptedEmail,
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
    });
};

//refrescar el token de acceso
exports.refreshToken = (req, res) => {
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
