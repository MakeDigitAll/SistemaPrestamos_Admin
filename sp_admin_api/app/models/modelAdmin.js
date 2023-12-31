module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("administradores", {
    idAdministrador: {
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
    adminPassword: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 100], // Mínimo 1 caracter, máximo 100 caracteres
      },
    },
    numTelefono: {
      type: Sequelize.STRING,
      validate: {
        len: [1, 12], // Mínimo 1 caracter, máximo 12 caracteres
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

  return Admin;
};
