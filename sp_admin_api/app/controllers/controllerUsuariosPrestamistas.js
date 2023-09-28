const db = require("../models");
const usuariosPrestamistas = db.usuariosPrestamistas;
const usuariosAfiliados = db.usuariosAfiliados;
const suscripciones = db.suscripciones;
const datosUsuarioSuscripciones = db.datosUsuarioSuscripciones;
const tipoSuscripciones = db.tipoSuscripciones;
const imagenPrestamista = db.imagenPrestamista;
const prestamos = db.prestamos;
const historialPrestamos = db.historialPagos;
const amistadPrestamistaClientes = db.amistadPrestamistaClientes;
const historialPagos = db.historialPagos;
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const { aesDecrypt, aesEncrypt } = require("../utils/cryptoUtils");
const generateReferralCode = require("../utils/referralCode");
const bcrypt = require("bcrypt");

//findAllUsuariosPrestamistaActivos
exports.findAllUsuariosPrestamistaActivos = async (req, res) => {
  TOKEN_KEY = process.env.JWT_PRIVATE_KEY;
  await usuariosPrestamistas
    .findAll({
      where: {
        isActive: true,
        isDeleted: false,
        isCompletedSuscription: true,
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
            idUsuarioPrestamista: aesEncrypt(
              user.idUsuarioPrestamista.toString()
            ),
            correoElectronico: aesEncrypt(user.correoElectronico),
            nombres: aesEncrypt(user.nombres),
            apellidos: aesEncrypt(user.apellidos),
            codigoReferencia: aesEncrypt(user.codigoReferencia),
            isActive: aesEncrypt(user.isActive.toString()),
            isDeleted: aesEncrypt(user.isDeleted.toString()),
            numeroTelefono: aesEncrypt(user.numeroTelefono.toString()),
            suscripciones: suscripcionesData[index].map((suscripcion) => ({
              idSuscripcion: aesEncrypt(suscripcion.idSuscripcion.toString()),
              idUsuarioPrestamista: aesEncrypt(
                suscripcion.idUsuarioPrestamista.toString()
              ),
              idNivelFidelidad: aesEncrypt(
                suscripcion.idNivelFidelidad.toString()
              ),
              idTipoSuscripcion: aesEncrypt(
                suscripcion.idTipoSuscripcion.toString()
              ),
              fechaInicio: aesEncrypt(suscripcion.fechaInicio.toString()),
              fechaFin: aesEncrypt(suscripcion.fechaFin.toString()),
              isActive: aesEncrypt(suscripcion.isActive.toString()),
            })),
          }));

          res.send({ usuariosPrestamistas });
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
exports.findAllUsuariosPrestamistaInactivos = async (req, res) => {
  TOKEN_KEY = process.env.JWT_PRIVATE_KEY;
  await usuariosPrestamistas
    .findAll({
      where: {
        isActive: false,
        isDeleted: false,
        isCompletedSuscription: true,
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
            idUsuarioPrestamista: aesEncrypt(
              user.idUsuarioPrestamista.toString()
            ),
            correoElectronico: aesEncrypt(user.correoElectronico),
            nombres: aesEncrypt(user.nombres),
            apellidos: aesEncrypt(user.apellidos),
            codigoReferencia: aesEncrypt(user.codigoReferencia),
            isActive: aesEncrypt(user.isActive.toString()),
            isDeleted: aesEncrypt(user.isDeleted.toString()),
            numeroTelefono: aesEncrypt(user.numeroTelefono.toString()),
            suscripciones: suscripcionesData[index].map((suscripcion) => ({
              idSuscripcion: aesEncrypt(suscripcion.idSuscripcion.toString()),
              idUsuarioPrestamista: aesEncrypt(
                suscripcion.idUsuarioPrestamista.toString()
              ),
              idNivelFidelidad: aesEncrypt(
                suscripcion.idNivelFidelidad.toString()
              ),
              idTipoSuscripcion: aesEncrypt(
                suscripcion.idTipoSuscripcion.toString()
              ),
              fechaInicio: aesEncrypt(suscripcion.fechaInicio.toString()),
              fechaFin: aesEncrypt(suscripcion.fechaFin.toString()),
              isActive: aesEncrypt(suscripcion.isActive.toString()),
            })),
          }));
          res.send({ usuariosPrestamistas });
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
exports.findAllUsuariosPrestamistaEliminados = async (req, res) => {
  TOKEN_KEY = process.env.JWT_PRIVATE_KEY;
  await usuariosPrestamistas
    .findAll({
      where: {
        isActive: false,
        isDeleted: true,
        isCompletedSuscription: true,
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
            idUsuarioPrestamista: aesEncrypt(
              user.idUsuarioPrestamista.toString()
            ),
            correoElectronico: aesEncrypt(user.correoElectronico),
            nombres: aesEncrypt(user.nombres),
            apellidos: aesEncrypt(user.apellidos),
            codigoReferencia: aesEncrypt(user.codigoReferencia),
            isActive: aesEncrypt(user.isActive.toString()),
            isDeleted: aesEncrypt(user.isDeleted.toString()),
            numeroTelefono: aesEncrypt(user.numeroTelefono.toString()),
            suscripciones: suscripcionesData[index].map((suscripcion) => ({
              idSuscripcion: aesEncrypt(suscripcion.idSuscripcion.toString()),
              idUsuarioPrestamista: aesEncrypt(
                suscripcion.idUsuarioPrestamista.toString()
              ),
              idNivelFidelidad: aesEncrypt(
                suscripcion.idNivelFidelidad.toString()
              ),
              idTipoSuscripcion: aesEncrypt(
                suscripcion.idTipoSuscripcion.toString()
              ),
              fechaInicio: aesEncrypt(suscripcion.fechaInicio.toString()),
              fechaFin: aesEncrypt(suscripcion.fechaFin.toString()),
              isActive: aesEncrypt(suscripcion.isActive.toString()),
            })),
          }));

          res.send({ usuariosPrestamistas });
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

exports.createUsuarioPrestamista = async (req, res) => {
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
  await usuariosPrestamistas
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
        // Hashear la contraseña antes de guardarla en la base de datos
        bcrypt.hash(decryptedPasswd, 10, (err, hashedPassword) => {
          if (err) {
            console.log(err);
            res.status(500).send({
              message: "Ocurrió un error al hashear la contraseña.",
            });
          } else {
            // Generar un nuevo código de referencia si el actual ya existe
            checkReferralCode().then((existingUser) => {
              while (existingUser) {
                referralCode = generateReferralCode();
                existingUser = checkReferralCode();
              }
              // Crear el usuario con la contraseña hasheada y el código de referencia único
              usuariosPrestamistas
                .create({
                  nombres: decryptedNombre,
                  apellidos: decryptedApellido,
                  correoElectronico: decryptedCorreo,
                  usuarioPassword: hashedPassword,
                  codigoReferencia: referralCode,
                  numeroTelefono: decryptedNumeroTelefono,
                  isCompletedSuscription: true,
                  isEmailConfirmed: true,
                })
                .then((prestamista) => {
                  // ... código anterior ...

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
                          idUsuarioPrestamista:
                            prestamista.idUsuarioPrestamista,
                          idNivelFidelidad: 1,
                          tiempoMeses: 0,
                          pagosAlCorriente: true,
                          idTipoSuscripcion: decryptedIDSuscripcion,
                          fechaInicio: new Date(),
                          fechaFin: new Date(
                            new Date().setMonth(new Date().getMonth() + 1)
                          ),
                        })
                        .then(() => {
                          //enviar el id del usuario creado
                          res.send({
                            idUsuarioPrestamista:
                              prestamista.idUsuarioPrestamista,
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
exports.deleteUsuarioPrestamista = async (req, res) => {
  const idUsuarioPrestamista = req.params.id;
  await usuariosPrestamistas
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
exports.updateUsuarioPrestamista = async (req, res) => {
  const idUsuarioPrestamista = req.params.id;
  const decryptedNombre = aesDecrypt(req.body.nombres);
  const decryptedApellido = aesDecrypt(req.body.apellidos);
  const decryptedNumeroTelefono = aesDecrypt(req.body.numeroTelefono);

  await usuariosPrestamistas
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
exports.setImagePrestamista = async (req, res) => {
  const id = req.params.id;
  const image = req.file.buffer; // Accedemos al buffer de la imagen

  //buscar la imagen del administrador en la tabla imagenPrestamista por el id del administrador y si existe la imagen la actualiza, si no existe la imagen la crea
  await imagenPrestamista
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
exports.getImagenPrestamista = async (req, res) => {
  const id = req.params.id;

  await imagenPrestamista
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
exports.activarSuscripcionUsuarioPrestamista = async (req, res) => {
  const idUsuarioPrestamista = req.params.idUsuario;
  const idSuscripcion = req.params.idSuscripcion;
  await suscripciones
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
exports.desactivarSuscripcionUsuarioPrestamista = async (req, res) => {
  const idUsuarioPrestamista = req.params.idUsuario;
  const idSuscripcion = req.params.idSuscripcion;
  await suscripciones
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
exports.habilitarUsuarioPrestamistaEliminado = async (req, res) => {
  const idUsuarioPrestamista = req.params.id;
  await usuariosPrestamistas
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

//getDataDashboard
exports.getDashboardData = async (req, res) => {
  const idUsuarioPrestamistaQuery = aesDecrypt(req.query.id);
  try {
    // Obtener los datos del prestamista
    const usuarioPrestamista = await usuariosPrestamistas.findAll({});

    const usuarioAfiluadoData = await usuariosAfiliados.findAll({});
    if (!usuarioPrestamista) {
      return res.status(400).send({
        message: "No se encontró el usuario prestamista.",
      });
    }
    const cachedData = myCache.get(idUsuarioPrestamistaQuery);

    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const dataToSend = {
      usuarioPrestamista: [],
    };

    for (const usuario of usuarioPrestamista) {
      // Obtener los datos de la suscripcion del prestamista
      const suscripcion = await suscripciones.findOne({
        where: {
          idUsuarioPrestamista: usuario.idUsuarioPrestamista,
          isActive: true,
        },
        order: [["fechaInicio", "DESC"]],
      });

      // Obtener los datos de los usuarios afiliados
      const amistadUsuarios = await amistadPrestamistaClientes.findAll({
        where: {
          idUsuarioPrestamista: usuario.idUsuarioPrestamista,
        },
      });

      const dataUsuariosAfiliados = [];

      for (const amistadUsuario of amistadUsuarios) {
        const usuarioAfiliado = await usuariosAfiliados.findOne({
          where: {
            idUsuarioAfiliado: amistadUsuario.idUsuarioAfiliado,
          },
        });

        // Obtener los préstamos del usuario afiliado
        const prestamosUsuario = await prestamos.findAll({
          where: {
            idUsuarioAfiliado: usuarioAfiliado.idUsuarioAfiliado,
            idUsuarioPrestamista: usuario.idUsuarioPrestamista,
          },
        });

        const dataPrestamosAfiliado = [];

        for (const prestamo of prestamosUsuario) {
          // Obtener el historial de pagos del préstamo
          const historialPagosPrestamo = await historialPagos.findAll({
            where: {
              idPrestamo: prestamo.idPrestamo,
              idUsuarioPrestamista: usuario.idUsuarioPrestamista,
              idUsuarioAfiliado: usuarioAfiliado.idUsuarioAfiliado,
            },
          });

          const dataHistorialPagos = [];

          for (const historialPago of historialPagosPrestamo) {
            dataHistorialPagos.push({
              idHistorialPago: historialPago.idHistorialPago.toString(),
              idPrestamo: historialPago.idPrestamo.toString(),
              idUsuarioPrestamista:
                historialPago.idUsuarioPrestamista.toString(),
              idUsuarioAfiliado: historialPago.idUsuarioAfiliado.toString(),
              fechaPago: historialPago.fechaPago.toString(),
              montoPagado: historialPago.montoPagado.toString(),
              montoRestante: historialPago.montoRestante.toString(),
              intereses: historialPago.intereses.toString(),
              tipoPago: historialPago.tipoPago.toString(),
              estadoPago: historialPago.estadoPago.toString(),
            });
          }

          // Agregar el historial de pagos al préstamo
          prestamo.dataValues.historialPagos = dataHistorialPagos;

          // Agregar el préstamo al arreglo de préstamos del usuario afiliado
          dataPrestamosAfiliado.push({
            idPrestamo: prestamo.idPrestamo.toString(),
            idUsuarioPrestamista: prestamo.idUsuarioPrestamista.toString(),
            idUsuarioAfiliado: prestamo.idUsuarioAfiliado.toString(),
            montoPrestado: prestamo.montoPrestado.toString(),
            tiempoPrestamo: prestamo.tiempoPrestamo.toString(),
            fechaPrestamo: prestamo.fechaPrestamo.toString(),
            fechaFinPago: prestamo.fechaFinPago.toString(),
            montoPorPagar: prestamo.montoPorPagar.toString(),
            fechaProximoPago: prestamo.fechaProximoPago.toString(),
            mesesRestantes: prestamo.mesesRestantes.toString(),
            tasaInteresGeneral: prestamo.tasaInteresGeneral.toString(),
            tasaInteresVencido: prestamo.tasaInteresVencido.toString(),
            estadoPrestamo: prestamo.estadoPrestamo.toString(),
            isActive: prestamo.isActive.toString(),
            historialPagos: dataHistorialPagos,
          });
        }

        // Agregar el arreglo de préstamos al usuario afiliado
        usuarioAfiliado.dataValues.prestamos = dataPrestamosAfiliado;

        dataUsuariosAfiliados.push({
          idUsuarioAfiliado: usuarioAfiliado.idUsuarioAfiliado.toString(),
          nombres: usuarioAfiliado.nombres.toString(),
          apellidos: usuarioAfiliado.apellidos.toString(),
          correoElectronico: usuarioAfiliado.correoElectronico.toString(),
          numeroTelefono: usuarioAfiliado.numeroTelefono.toString(),
          prestamos: dataPrestamosAfiliado,
        });
      }

      // Encriptar los datos del prestamista
      const encryptedUsuarioPrestamista = {
        idUsuarioPrestamista: aesEncrypt(
          usuario.idUsuarioPrestamista.toString()
        ),
        correoElectronico: aesEncrypt(usuario.correoElectronico.toString()),
        nombres: aesEncrypt(usuario.nombres.toString()),
        apellidos: aesEncrypt(usuario.apellidos.toString()),
        numeroTelefono: aesEncrypt(usuario.numeroTelefono.toString()),
        isActive: aesEncrypt(usuario.isActive.toString()),
        codigoReferencia: aesEncrypt(usuario.codigoReferencia.toString()),
        isCompletedSuscription: aesEncrypt(
          usuario.isCompletedSuscription.toString()
        ),
        isEmailConfirmed: aesEncrypt(usuario.isEmailConfirmed.toString()),
        isDeleted: aesEncrypt(usuario.isDeleted.toString()),
      };

      //si el usuario prestamista tiene suscripcion obtener el tipo de suscripcion
      let infoSuscripcion = null;
      if (suscripcion) {
        const tipoSuscripcion = await tipoSuscripciones.findOne({
          where: {
            idTipoSuscripcion: suscripcion.idTipoSuscripcion,
          },
        });
        infoSuscripcion = tipoSuscripcion;
      }
      // Encriptar los datos de la suscripción
      const encryptedDataSuscripcion = {
        idSuscripcion: suscripcion
          ? aesEncrypt(suscripcion.idSuscripcion.toString())
          : null,
        idUsuarioPrestamista: suscripcion
          ? aesEncrypt(suscripcion.idUsuarioPrestamista.toString())
          : null,
        idNivelFidelidad: suscripcion
          ? aesEncrypt(suscripcion.idNivelFidelidad.toString())
          : null,
        idTipoSuscripcion: suscripcion
          ? aesEncrypt(suscripcion.idTipoSuscripcion.toString())
          : null,
        fechaInicio: suscripcion
          ? aesEncrypt(suscripcion.fechaInicio.toString())
          : null,
        fechaFin: suscripcion
          ? aesEncrypt(suscripcion.fechaFin.toString())
          : null,
        tiempoMeses: suscripcion
          ? aesEncrypt(suscripcion.tiempoMeses.toString())
          : null,
        pagosAlCorriente: suscripcion
          ? aesEncrypt(suscripcion.pagosAlCorriente.toString())
          : null,
        isActive: suscripcion
          ? aesEncrypt(suscripcion.isActive.toString())
          : null,
        costoMembresia: infoSuscripcion
          ? aesEncrypt(infoSuscripcion.costoMembresia.toString())
          : null,
        nombreSuscripcion: infoSuscripcion
          ? aesEncrypt(infoSuscripcion.nombreSuscripcion.toString())
          : null,
      };

      // Encriptar los datos de los usuarios afiliados
      const dataUsuariosAfiliadosEncriptados = dataUsuariosAfiliados.map(
        (usuarioAfiliado) => {
          return {
            idUsuarioAfiliado: aesEncrypt(
              usuarioAfiliado.idUsuarioAfiliado.toString()
            ),
            nombres: aesEncrypt(usuarioAfiliado.nombres.toString()),
            apellidos: aesEncrypt(usuarioAfiliado.apellidos.toString()),
            correoElectronico: aesEncrypt(
              usuarioAfiliado.correoElectronico.toString()
            ),
            numeroTelefono: aesEncrypt(
              usuarioAfiliado.numeroTelefono.toString()
            ),
            prestamos: usuarioAfiliado.prestamos.map((prestamo) => {
              return {
                idPrestamo: aesEncrypt(prestamo.idPrestamo.toString()),
                idUsuarioPrestamista: aesEncrypt(
                  prestamo.idUsuarioPrestamista.toString()
                ),
                idUsuarioAfiliado: aesEncrypt(
                  prestamo.idUsuarioAfiliado.toString()
                ),
                montoPorPagar: aesEncrypt(prestamo.montoPorPagar.toString()),
                fechaProximoPago: aesEncrypt(
                  prestamo.fechaProximoPago.toString()
                ),
                mesesRestantes: aesEncrypt(prestamo.mesesRestantes.toString()),
                montoPrestado: aesEncrypt(prestamo.montoPrestado.toString()),
                tiempoPrestamo: aesEncrypt(prestamo.tiempoPrestamo.toString()),
                fechaPrestamo: aesEncrypt(prestamo.fechaPrestamo.toString()),
                fechaFinPago: aesEncrypt(prestamo.fechaFinPago.toString()),
                tasaInteresGeneral: aesEncrypt(
                  prestamo.tasaInteresGeneral.toString()
                ),
                tasaInteresVencido: aesEncrypt(
                  prestamo.tasaInteresVencido.toString()
                ),
                estadoPrestamo: aesEncrypt(prestamo.estadoPrestamo.toString()),
                isActive: aesEncrypt(prestamo.isActive.toString()),
              };
            }),
          };
        }
      );

      // Construir el objeto de datos a enviar para este usuario prestamista
      const userData = {
        usuarioPrestamista: encryptedUsuarioPrestamista,
      };

      if (suscripcion) {
        userData.usuarioPrestamista.suscripcion = encryptedDataSuscripcion;
      }

      userData.usuarioPrestamista.usuariosAfiliados =
        dataUsuariosAfiliadosEncriptados;
      dataToSend.usuarioPrestamista.push(userData);

      //mandar los usuarios afiliados aparte de los usuarios prestamistas
      dataToSend.usuariosAfiliados = usuarioAfiluadoData.map((usuario) => {
        return {
          idUsuarioAfiliado: aesEncrypt(usuario.idUsuarioAfiliado.toString()),
          nombres: aesEncrypt(usuario.nombres.toString()),
          apellidos: aesEncrypt(usuario.apellidos.toString()),
          correoElectronico: aesEncrypt(usuario.correoElectronico.toString()),
          numeroTelefono: aesEncrypt(usuario.numeroTelefono.toString()),
          isOnPrestamo: aesEncrypt(usuario.isOnPrestamo.toString()),
          isDeleted: aesEncrypt(usuario.isDeleted.toString()),
          isEmailConfirmed: aesEncrypt(usuario.isEmailConfirmed.toString()),
          createdAt: aesEncrypt(usuario.createdAt.toString()),
        };
      });
    }
    myCache.set(idUsuarioPrestamistaQuery, dataToSend, 10);
    res.status(200).json(dataToSend);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Ocurrió un error en el servidor." });
  }
};
