module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define(
    "administradores",
    {
      idadmin: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      correo_electronico: {
        type: Sequelize.STRING,
      },
      passwd: {
        type: Sequelize.STRING,
      },
      nombres: {
        type: Sequelize.STRING,
      },
      apellidos: {
        type: Sequelize.STRING,
      },
    },
    //Desactivar los timestamps de las tablas de la base de datos
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Model;
};
