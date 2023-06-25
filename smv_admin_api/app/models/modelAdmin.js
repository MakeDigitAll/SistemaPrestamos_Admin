module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define("administradores", {
    idadmin: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    correo_electronico: {
      type: Sequelize.STRING,
      allowNull: false, // En lugar de "required: true"
    },
    passwd: {
      type: Sequelize.STRING,
      allowNull: false, // En lugar de "required: true"
    },
    nombres: {
      type: Sequelize.STRING,
      allowNull: false, // En lugar de "required: true"
    },
    apellidos: {
      type: Sequelize.STRING,
      allowNull: false, // En lugar de "required: true"
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // Establece la fecha actual como valor predeterminado al crear un registro
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // Establece la fecha actual como valor predeterminado al actualizar un registro
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
