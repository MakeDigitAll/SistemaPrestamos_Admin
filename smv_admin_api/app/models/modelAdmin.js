module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define("administradores", {
    idAdministrador: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    correoElectronico: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 255], // Mínimo 1 caracter, máximo 255 caracteres
      },
    },
    adminPassword: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 255], // Mínimo 1 caracter, máximo 255 caracteres
      },
    },
    nombres: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 255], // Mínimo 1 caracter, máximo 255 caracteres
      },
    },
    apellidos: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 255], // Mínimo 1 caracter, máximo 255 caracteres
      },
    },
    imagenPerfil: {
      type: Sequelize.BLOB, // Almacena los datos binarios de la imagen
      allowNull: true,
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
