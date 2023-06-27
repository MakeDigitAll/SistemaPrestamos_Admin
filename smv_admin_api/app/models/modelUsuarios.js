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
    },
    usuarioPassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nombres: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidos: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imagenPerfil: {
      type: Sequelize.BLOB, // Almacena los datos binarios de la imagen
      allowNull: true,
    },
    tipoUsuario: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    codigoReferencia: {
      type: Sequelize.STRING,
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
