const db = require("../models");
const usuarios = db.usuarios;
const jwt = require("jsonwebtoken");
const TOKEN_KEY = "a4najdPy7Ji3I21Fai2Hv4GfKvu0lixZ";
const { aesDecrypt } = require("../utils/cryptoUtils");
const generateReferralCode = require("../utils/referralCode");
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
        isActive: user.isActive,
        isDeleted: user.isDeleted,
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

//crear un nuevo usuario de tipo prestamista

exports.createUsuarioPrestamista = (req, res) => {
  const decryptedNombre = aesDecrypt(req.body.nombre);
  const decryptedApellido = aesDecrypt(req.body.apellidos);
  const decryptedCorreo = aesDecrypt(req.body.email);
  const decryptedPasswd = aesDecrypt(req.body.password);
  let referralCode = generateReferralCode();

  // Función para comprobar si el código de referencia existe en la base de datos
  const checkReferralCode = () => {
    return usuarios.findOne({ where: { codigoReferencia: referralCode } });
  };

  // Validar que el correo electrónico no esté registrado en la base de datos
  usuarios
    .findOne({ where: { correoElectronico: decryptedCorreo } })
    .then((data) => {
      if (data) {
        // Si el correo ya está registrado, enviar mensaje de error
        res.status(400).send({
          message: "El correo electrónico ya está registrado.",
        });
      } else {
        // Verificar si el código de referencia ya existe en la base de datos
        checkReferralCode().then((existingUser) => {
          // Generar un nuevo código de referencia si el actual ya existe
          while (existingUser) {
            referralCode = generateReferralCode();
            existingUser = checkReferralCode();
          }

          // Crear el usuario con el código de referencia único
          usuarios
            .create({
              nombres: decryptedNombre,
              apellidos: decryptedApellido,
              correoElectronico: decryptedCorreo,
              usuarioPassword: decryptedPasswd,
              codigoReferencia: referralCode,
              tipoUsuario: "Prestamista",
            })
            .then(() => {
              res.send({
                message: "Usuario creado exitosamente.",
              });
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Ocurrió un error al crear el usuario en la base de datos.",
              });
            });
        });
      }
    });
};
