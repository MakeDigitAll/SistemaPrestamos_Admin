module.exports = (sequelize, Sequelize) => {
  const imagenPrestamistas = sequelize.define(
    "imagenPrestamistas",
    {
      idImagen: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUsuarioPrestamista: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuariosPrestamistas",
          key: "idUsuarioPrestamista",
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

  return imagenPrestamistas;
};
