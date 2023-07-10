const db = require("../models");
const usuariosPrestamistas = db.usuariosPrestamistas;
const usuariosAfiliados = db.usuariosAfiliados;
const suscripciones = db.suscripciones;
const calidadPrestamista = db.calidadPrestamista;

const jwt = require("jsonwebtoken");
const TOKEN_KEY = "a4najdPy7Ji3I21Fai2Hv4GfKvu0lixZ";
const { aesDecrypt } = require("../utils/cryptoUtils");
const generateReferralCode = require("../utils/referralCode");

// obtener todos los usuariosPrestamistas de tipo prestamista (tipoUsuario = Prestamista) con sus suscripciones
exports.findAllUsuariosPrestamista = (req, res) => {
  usuariosPrestamistas
    .findAll({
      include: [
        {
          model: suscripciones,
          as: "suscripcion",
          model: calidadPrestamista,
          as: "calidadPrestamista",
        },
      ],
    })
    .then((data) => {
      const usuariosPrestamistas = data.map((user) => ({
        idUsuarioPrestamista: user.idUsuarioPrestamista,
        correoElectronico: user.correoElectronico,
        nombres: user.nombres,
        apellidos: user.apellidos,
        codigoReferencia: user.codigoReferencia,
        isActive: user.isActive,
        isDeleted: user.isDeleted,
        numeroTelefono: user.numeroTelefono,
        suscripcion: user.suscripcion?.idSuscripcion
          ? {
              idSuscripcion: user.suscripcion.idSuscripcion,
              tipoSuscripcion: user.suscripcion.tipoSuscripcion,
              fechaInicio: user.suscripcion.fechaInicio,
              fechaFin: user.suscripcion.fechaFin,
              estadoSuscripcion: user.suscripcion.estadoSuscripcion,
            }
          : null,
        calidadPrestamista : user.calidadPrestamista?.idCalidadPrestamista
          ? {
              idCalidadPrestamista: user.calidadPrestamista.idCalidadPrestamista,
              montoDesde: user.calidadPrestamista.montoDesde,
              montoHasta: user.calidadPrestamista.montoHasta,
              numeroUsuarios : user.calidadPrestamista.numeroUsuarios,
              nombreNivel : user.calidadPrestamista.nombreNivel,
              costoMembresia : user.calidadPrestamista.costoMembresia,
            }
          : null,
      }));
      const tokenUsuarios = jwt.sign({ usuariosPrestamistas }, TOKEN_KEY);
      res.send({ tokenUsuarios });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al obtener los usuariosPrestamistas.",
      });
      console.log(err);
    });
};

//crear un nuevo usuario de tipo prestamista

exports.createUsuarioPrestamista = (req, res) => {
  const decryptedNombre = aesDecrypt(req.body.nombre);
  const decryptedApellido = aesDecrypt(req.body.apellidos);
  const decryptedCorreo = aesDecrypt(req.body.email);
  const decryptedPasswd = aesDecrypt(req.body.password);
  const decryptedMontoMinimo = aesDecrypt(req.body.montoMinimo);
  const decryptedMontoMaximo = aesDecrypt(req.body.montoMaximo);
  const decryptedNumeroClientes = aesDecrypt(req.body.numeroClientes);
  const decryptedNumeroTelefono = aesDecrypt(req.body.numeroTelefono);
  const decryptedNombreNivel = aesDecrypt(req.body.nombreNivel);

  let referralCode = generateReferralCode();

  // Función para comprobar si el código de referencia existe en la base de datos
  const checkReferralCode = () => {
    return usuariosPrestamistas.findOne({
      where: { codigoReferencia: referralCode },
    });
  };

  // Validar que el correo electrónico no esté registrado en la base de datos
  usuariosPrestamistas
    .findOne({ where: { correoElectronico: decryptedCorreo } })
    .then((prestamista) => {
      if (prestamista) {
        // Si el correo está registrado en usuariosPrestamistas, enviar mensaje de error
        res.status(400).send({
          message: "El correo electrónico ya está registrado como prestamista.",
        });
      } else {
        usuariosAfiliados
          .findOne({ where: { correoElectronico: decryptedCorreo } })
          .then((afiliado) => {
            if (afiliado) {
              // Si el correo está registrado en usuariosAfiliados, enviar mensaje de error
              res.status(400).send({
                message:
                  "El correo electrónico ya está registrado como afiliado.",
              });
            } else {
              // El correo no está registrado en ninguna de las tablas, proceder con la creación del usuario
              // Verificar si el código de referencia ya existe en la base de datos
              checkReferralCode().then((existingUser) => {
                // Generar un nuevo código de referencia si el actual ya existe
                while (existingUser) {
                  referralCode = generateReferralCode();
                  existingUser = checkReferralCode();
                }
                // Crear el usuario con el código de referencia único
                usuariosPrestamistas
                  .create({
                    nombres: decryptedNombre,
                    apellidos: decryptedApellido,
                    correoElectronico: decryptedCorreo,
                    usuarioPassword: decryptedPasswd,
                    codigoReferencia: referralCode,
                    numeroTelefono: decryptedNumeroTelefono.toString(),
                  })
                  .then((prestamista) => {
                    // Insertar datos en la tabla calidadPrestamista
                    calidadPrestamista
                      .create({
                        idUsuarioPrestamista: prestamista.idUsuarioPrestamista,
                        montoDesde: decryptedMontoMinimo,
                        montoHasta: decryptedMontoMaximo,
                        numeroUsuarios: decryptedNumeroClientes,
                        nombreNivel: decryptedNombreNivel,
                      })
                      .then(() => {
                        res.send({ message: "Usuario creado exitosamente." });
                      })
                      .catch((err) => {
                        console.log(err);
                        res.status(500).send({
                          message:
                            err.message ||
                            "Ocurrió un error al crear los datos de calidad en la base de datos.",
                        });
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(500).send({
                      message:
                        err.message ||
                        "Ocurrió un error al crear el usuario en la base de datos.",
                    });
                  });
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Ocurrió un error al consultar la base de datos.",
              console: err,
            });
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Ocurrió un error al consultar la base de datos." });
      console.log(err);
    });
};

//cambiar el estado isDeleted de un usuario a true
exports.deleteUsuarioPrestamista = (req, res) => {
  const idUsuarioPrestamista = req.params.id;
  usuariosPrestamistas
    .update(
      { isDeleted: true },
      {
        where: { idUsuarioPrestamista: idUsuarioPrestamista },
      }
    )
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "Usuario eliminado exitosamente.",
        });
      } else {
        res.send({
          message: `No se pudo eliminar el usuario con id=${idUsuarioPrestamista}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocurrió un error al eliminar el usuario con id=" +
          idUsuarioPrestamista,
      });
    });
};

//updateUsuarioPrestamista los datos de nombres apellido y tipoUsuario
exports.updateUsuarioPrestamista = (req, res) => {
  const idUsuarioPrestamista = req.params.id;
  const decryptedNombre = aesDecrypt(req.body.nombres);
  const decryptedApellido = aesDecrypt(req.body.apellidos);

  usuariosPrestamistas
    .update(
      {
        nombres: decryptedNombre,
        apellidos: decryptedApellido,
        isModified: true,
      },
      {
        where: { idUsuarioPrestamista: idUsuarioPrestamista },
      }
    )
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "Usuario actualizado exitosamente.",
        });
      } else {
        res.send({
          message: `No se pudo actualizar el usuario con id=${idUsuarioPrestamista}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocurrió un error al actualizar el usuario con id=" +
          idUsuarioPrestamista,
      });
    });
};
