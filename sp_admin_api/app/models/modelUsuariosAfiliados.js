module.exports = (sequelize, Sequelize) => {
  const UsuariosAfiliados = sequelize.define("usuariosAfiliados", {
    idUsuarioAfiliado: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    correoElectronico: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 100], // Mínimo 1 caracter, máximo 100 caracteres
      },
    },
    usuarioPassword: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 100], // Mínimo 1 caracter, máximo 100 caracteres
      },
    },
    nombres: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 50], // Mínimo 1 caracter, máximo 50 caracteres
      },
    },
    apellidos: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 50], // Mínimo 1 caracter, máximo 50 caracteres
      },
    },
    numeroTelefono: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [10, 10], // Mínimo 1 caracter, máximo 20 caracteres
      },
    },
    isOnPrestamo: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isModified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isPasswordChanged: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isEmailConfirmed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return UsuariosAfiliados;
};
