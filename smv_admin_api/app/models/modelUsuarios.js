module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define("usuarios", {
    idUsuario: {
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
    imagenPerfil: {
      type: Sequelize.BLOB, // Almacena los datos binarios de la imagen
      allowNull: true,
    },
    tipoUsuario: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 30], // Mínimo 1 caracter, máximo 30 caracteres
      },
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    codigoReferencia: {
      type: Sequelize.STRING,
      validate: {
        len: [1, 6], // Mínimo 1 caracter, máximo 6 caracteres
      },
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
  });

  return Model;
};
