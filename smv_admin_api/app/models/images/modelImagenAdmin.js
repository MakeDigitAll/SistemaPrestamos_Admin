module.exports = (sequelize, Sequelize) => {
  const imagenAdministrador = sequelize.define(
    "imagenAdministradores",
    {
      idImagen: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idAdministrador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "administradores",
          key: "idAdministrador",
        },
      },
      imagen: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );

  return imagenAdministrador;
};
