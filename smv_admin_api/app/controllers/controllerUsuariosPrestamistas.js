const db = require("../models");
const usuariosPrestamistas = db.usuariosPrestamistas;
const usuariosAfiliados = db.usuariosAfiliados;
const suscripciones = db.suscripciones;
const datosUsuarioSuscripciones = db.datosUsuarioSuscripciones;
const imagenPrestamista = db.imagenPrestamista;

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
          as: "suscripciones_prestamista",
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

//findAllUsuariosPrestamistaActivos
exports.findAllUsuariosPrestamista = (req, res) => {
  usuariosPrestamistas
    .findAll({
      include: [
        {
          model: suscripciones,
          as: "suscripciones_prestamista",
        },
      ],
    })
    .then((data) => {
      const suscripcionesPromises = data.map((user) =>
        suscripciones.findAll({
          where: {
            idUsuarioPrestamista: user.idUsuarioPrestamista,
          },
        })
      );
      Promise.all(suscripcionesPromises)
        .then((suscripcionesData) => {
          // Asociar las suscripciones a los usuariosPrestamistas
          const usuariosPrestamistas = data.map((user, index) => ({
            idUsuarioPrestamista: user.idUsuarioPrestamista,
            correoElectronico: user.correoElectronico,
            nombres: user.nombres,
            apellidos: user.apellidos,
            codigoReferencia: user.codigoReferencia,
            isActive: user.isActive,
            isDeleted: user.isDeleted,
            numeroTelefono: user.numeroTelefono,
            suscripciones: suscripcionesData[index],
          }));

          const tokenUsuarios = jwt.sign({ usuariosPrestamistas }, TOKEN_KEY);
          res.send({ tokenUsuarios });
        })
        .catch((err) => {
          // Manejar el error
          res.status(500).send({
            message:
              err.message ||
              "Ocurrió un error al obtener las suscripciones de los usuariosPrestamistas.",
          });
          console.log(err);
        });
    })
    .catch((err) => {
      // Manejar el error
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al obtener los usuariosPrestamistas.",
      });
      console.log(err);
    });
};
//findAllUsuariosPrestamistaActivos
exports.findAllUsuariosPrestamistaActivos = (req, res) => {
  usuariosPrestamistas
    .findAll({
      where: {
        isActive: true,
        isDeleted: false,
      },
    })
    .then((data) => {
      const suscripcionesPromises = data.map((user) =>
        suscripciones.findAll({
          where: {
            idUsuarioPrestamista: user.idUsuarioPrestamista,
          },
        })
      );
      Promise.all(suscripcionesPromises)
        .then((suscripcionesData) => {
          // Asociar las suscripciones a los usuariosPrestamistas
          const usuariosPrestamistas = data.map((user, index) => ({
            idUsuarioPrestamista: user.idUsuarioPrestamista,
            correoElectronico: user.correoElectronico,
            nombres: user.nombres,
            apellidos: user.apellidos,
            codigoReferencia: user.codigoReferencia,
            isActive: user.isActive,
            isDeleted: user.isDeleted,
            numeroTelefono: user.numeroTelefono,
            suscripciones: suscripcionesData[index],
          }));

          const tokenUsuarios = jwt.sign({ usuariosPrestamistas }, TOKEN_KEY);
          res.send({ tokenUsuarios });
        })
        .catch((err) => {
          // Manejar el error
          res.status(500).send({
            message:
              err.message ||
              "Ocurrió un error al obtener las suscripciones de los usuariosPrestamistas.",
          });
          console.log(err);
        });
    })
    .catch((err) => {
      // Manejar el error
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al obtener los usuariosPrestamistas.",
      });
      console.log(err);
    });
};

//findAllUsuariosPrestamista con sus suscripciones
exports.findAllUsuariosPrestamistaInactivos = (req, res) => {
  usuariosPrestamistas
    .findAll({
      where: {
        isActive: false,
        isDeleted: false,
      },
    })
    .then((data) => {
      const suscripcionesPromises = data.map((user) =>
        suscripciones.findAll({
          where: {
            idUsuarioPrestamista: user.idUsuarioPrestamista,
          },
        })
      );
      Promise.all(suscripcionesPromises)
        .then((suscripcionesData) => {
          // Asociar las suscripciones a los usuariosPrestamistas
          const usuariosPrestamistas = data.map((user, index) => ({
            idUsuarioPrestamista: user.idUsuarioPrestamista,
            correoElectronico: user.correoElectronico,
            nombres: user.nombres,
            apellidos: user.apellidos,
            codigoReferencia: user.codigoReferencia,
            isActive: user.isActive,
            isDeleted: user.isDeleted,
            numeroTelefono: user.numeroTelefono,
            suscripciones: suscripcionesData[index],
          }));

          const tokenUsuarios = jwt.sign({ usuariosPrestamistas }, TOKEN_KEY);
          res.send({ tokenUsuarios });
        })
        .catch((err) => {
          // Manejar el error
          res.status(500).send({
            message:
              err.message ||
              "Ocurrió un error al obtener las suscripciones de los usuariosPrestamistas.",
          });
          console.log(err);
        });
    })
    .catch((err) => {
      // Manejar el error
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al obtener los usuariosPrestamistas.",
      });
      console.log(err);
    });
};

//findAllUsuariosPrestamistaActivos
exports.findAllUsuariosPrestamistaEliminados = (req, res) => {
  usuariosPrestamistas
    .findAll({
      where: {
        isActive: false,
        isDeleted: true,
      },
    })
    .then((data) => {
      const suscripcionesPromises = data.map((user) =>
        suscripciones.findAll({
          where: {
            idUsuarioPrestamista: user.idUsuarioPrestamista,
          },
        })
      );
      Promise.all(suscripcionesPromises)
        .then((suscripcionesData) => {
          // Asociar las suscripciones a los usuariosPrestamistas
          const usuariosPrestamistas = data.map((user, index) => ({
            idUsuarioPrestamista: user.idUsuarioPrestamista,
            correoElectronico: user.correoElectronico,
            nombres: user.nombres,
            apellidos: user.apellidos,
            codigoReferencia: user.codigoReferencia,
            isActive: user.isActive,
            isDeleted: user.isDeleted,
            numeroTelefono: user.numeroTelefono,
            suscripciones: suscripcionesData[index],
          }));

          const tokenUsuarios = jwt.sign({ usuariosPrestamistas }, TOKEN_KEY);
          res.send({ tokenUsuarios });
        })
        .catch((err) => {
          // Manejar el error
          res.status(500).send({
            message:
              err.message ||
              "Ocurrió un error al obtener las suscripciones de los usuariosPrestamistas.",
          });
          console.log(err);
        });
    })
    .catch((err) => {
      // Manejar el error
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al obtener los usuariosPrestamistas.",
      });
      console.log(err);
    });
};

exports.createUsuarioPrestamista = (req, res) => {
  const decryptedNombre = aesDecrypt(req.body.nombre);
  const decryptedApellido = aesDecrypt(req.body.apellidos);
  const decryptedCorreo = aesDecrypt(req.body.email);
  const decryptedPasswd = aesDecrypt(req.body.password);
  const decryptedMontoMinimo = aesDecrypt(req.body.montoMinimo);
  const decryptedMontoMaximo = aesDecrypt(req.body.montoMaximo);
  const decryptedNumeroClientes = aesDecrypt(req.body.numeroClientes);
  const decryptedNumeroTelefono = aesDecrypt(req.body.numeroTelefono);
  const decryptedIDSuscripcion = aesDecrypt(req.body.idSuscripcion);

  let referralCode = generateReferralCode();
  const errors = [];

  // Función para comprobar si el código de referencia existe en la base de datos
  const checkReferralCode = () => {
    return usuariosPrestamistas.findOne({
      where: { codigoReferencia: referralCode },
    });
  };

  // Verificar si el correo electrónico ya está registrado en la base de datos
  usuariosPrestamistas
    .findOne({ where: { correoElectronico: decryptedCorreo } })
    .then((prestamista) => {
      if (prestamista) {
        errors.push({
          type: "correo",
          message: "El correo electrónico ya está registrado como prestamista.",
        });
      }

      // Verificar si el correo está registrado como afiliado
      return usuariosAfiliados.findOne({
        where: { correoElectronico: decryptedCorreo },
      });
    })
    .then((afiliado) => {
      if (afiliado) {
        errors.push({
          type: "correo",
          message: "El correo electrónico ya está registrado como afiliado.",
        });
      }

      // Verificar si el número de teléfono ya está registrado como prestamista
      return usuariosPrestamistas.findOne({
        where: { numeroTelefono: decryptedNumeroTelefono },
      });
    })
    .then((prestamista) => {
      if (prestamista) {
        errors.push({
          type: "phone",
          message: "El número de teléfono ya está registrado como prestamista.",
        });
      }

      // Verificar si el número de teléfono ya está registrado como afiliado
      return usuariosAfiliados.findOne({
        where: { numeroTelefono: decryptedNumeroTelefono },
      });
    })
    .then((afiliado) => {
      if (afiliado) {
        errors.push({
          type: "phone",
          message: "El número de teléfono ya está registrado como afiliado.",
        });
      }

      // Si hay errores acumulados, enviar mensaje de error con los errores
      if (errors.length > 0) {
        const errorMessages = errors.map((error) => ({
          type: error.type,
          message: error.message,
        }));
        res.status(400).send({ errors: errorMessages });
      } else {
        // El correo y el número de teléfono no están registrados, proceder con la creación del usuario
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
              numeroTelefono: decryptedNumeroTelefono,
            })
            .then((prestamista) => {
              // Insertar datos en la tabla calidadPrestamista
              datosUsuarioSuscripciones
                .create({
                  idUsuarioPrestamista: prestamista.idUsuarioPrestamista,
                  montoAPrestarDesde: decryptedMontoMinimo,
                  montoAPrestarHasta: decryptedMontoMaximo,
                  numeroUsuarios: decryptedNumeroClientes,
                  antiguedadMeses: 0,
                  pagosAlCorriente: true,
                })
                // Insertar datos en la tabla suscripciones
                .then(() => {
                  suscripciones
                    .create({
                      idUsuarioPrestamista: prestamista.idUsuarioPrestamista,
                      idNivelFidelidad: 1,
                      idTipoSuscripcion: decryptedIDSuscripcion,
                      fechaInicio: new Date(),
                      //fecha actual mas 1 mes
                      fechaFin: new Date(
                        new Date().setMonth(new Date().getMonth() + 1)
                      ),
                      //estadoSuscripcion: "Activa",
                    })
                    .then(() => {
                      //enviar le id del usuario creado
                      res.send({
                        idUsuarioPrestamista: prestamista.idUsuarioPrestamista,
                      });
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
        error: err,
      });
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
  const decryptedNumeroTelefono = aesDecrypt(req.body.numeroTelefono);

  usuariosPrestamistas
    .update(
      {
        nombres: decryptedNombre,
        apellidos: decryptedApellido,
        numeroTelefono: decryptedNumeroTelefono,
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

//set imagen

//actualizar la  imagen de perfil del administrador
exports.setImagePrestamista = (req, res) => {
  const id = req.params.id;
  const image = req.file.buffer; // Accedemos al buffer de la imagen

  //buscar la imagen del administrador en la tabla imagenPrestamista por el id del administrador y si existe la imagen la actualiza, si no existe la imagen la crea
  imagenPrestamista
    .findOne({
      where: {
        idUsuarioPrestamista: id,
      },
    })
    .then((data) => {
      if (data) {
        //actualizar la imagen del administrador
        imagenPrestamista
          .update(
            {
              imagen: image,
            },
            {
              where: { idUsuarioPrestamista: id },
            }
          )
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Imagen actualizada correctamente.",
              });
            } else {
              res.send({
                message: `No se puede actualizar la imagen. Tal vez la imagen no fue encontrada o req.body está vacío!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error al actualizar la imagen" + err,
            });
          });
      } else {
        //crear la imagen del usuario
        const imagen = {
          idUsuarioPrestamista: id,
          imagen: image,
        };

        imagenPrestamista
          .create(imagen)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Ocurrió un error al crear la imagen del usuario.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al buscar la imagen del usuario.",
      });
    });
};

//obtener la imagen de perfil del usuario de la base de datos (BLOB)
exports.getImagenPrestamista = (req, res) => {
  const id = req.params.id;

  imagenPrestamista
    .findOne({
      where: {
        idUsuarioPrestamista: id,
      },
    })
    .then((data) => {
      if (data) {
        res.send(data.imagen);
      } else {
        res.status(500).send({
          message: "No se encontró la imagen del usuario prestamista.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al buscar la imagen del usuario prestamista.",
      });
    });
};

//activar la suscripcion de un usuario prestamista y al usuario prestamista isActivo = true
exports.activarSuscripcionUsuarioPrestamista = (req, res) => {
  const idUsuarioPrestamista = req.params.idUsuario;
  const idSuscripcion = req.params.idSuscripcion;
  suscripciones
    .update(
      {
        isActive: true,
      },
      {
        where: { idSuscripcion: idSuscripcion },
      }
    )
    .then((data) => {
      if (data == 1) {
        usuariosPrestamistas
          .update(
            {
              isActive: true,
            },
            {
              where: { idUsuarioPrestamista: idUsuarioPrestamista },
            }
          )
          .then((data) => {
            if (data == 1) {
              res.send({
                message: "Suscripcion activada exitosamente.",
              });
            } else {
              res.send({
                message: `No se pudo activar la suscripcion con id=${req.body.idSuscripcion}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message:
                "Ocurrió un error al activar la suscripcion con id=" +
                req.body.idSuscripcion,
            });
          });
      } else {
        res.send({
          message: `No se pudo activar la suscripcion con id=${req.body.idSuscripcion}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocurrió un error al activar la suscripcion con id=" +
          req.body.idSuscripcion,
      });
    });
};

//desactivar la suscripcion de un usuario prestamista y al usuario prestamista isActivo = false
exports.desactivarSuscripcionUsuarioPrestamista = (req, res) => {
  const idUsuarioPrestamista = req.params.idUsuario;
  const idSuscripcion = req.params.idSuscripcion;
  suscripciones
    .update(
      {
        isActive: false,
      },
      {
        where: { idSuscripcion: idSuscripcion },
      }
    )
    .then((data) => {
      if (data == 1) {
        usuariosPrestamistas
          .update(
            {
              isActive: false,
            },
            {
              where: { idUsuarioPrestamista: idUsuarioPrestamista },
            }
          )
          .then((data) => {
            if (data == 1) {
              res.send({
                message: "Suscripcion desactivada exitosamente.",
              });
            } else {
              res.send({
                message: `No se pudo desactivar la suscripcion con id=${req.body.idSuscripcion}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message:
                "Ocurrió un error al desactivar la suscripcion con id=" +
                req.body.idSuscripcion,
            });
          });
      } else {
        res.send({
          message: `No se pudo desactivar la suscripcion con id=${req.body.idSuscripcion}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocurrió un error al desactivar la suscripcion con id=" +
          req.body.idSuscripcion,
      });
    });
};

//Habilitar el usuario prestamista eliminado
exports.habilitarUsuarioPrestamistaEliminado = (req, res) => {
  const idUsuarioPrestamista = req.params.id;
  usuariosPrestamistas
    .update(
      { isDeleted: false },
      {
        where: { idUsuarioPrestamista: idUsuarioPrestamista },
      }
    )
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "Usuario habilitado exitosamente.",
        });
      } else {
        res.send({
          message: `No se pudo habilitar el usuario con id=${idUsuarioPrestamista}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocurrió un error al habilitar el usuario con id=" +
          idUsuarioPrestamista,
      });
    });
};
