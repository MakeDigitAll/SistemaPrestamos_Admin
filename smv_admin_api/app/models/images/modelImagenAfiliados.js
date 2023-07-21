module.exports = (sequelize, Sequelize) => {
  const imagenAfiliados = sequelize.define(
    "imagenAfiliados",
    {
      idImagen: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUsuarioAfiliado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuariosAfiliados",
          key: "idUsuarioAfiliado",
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

  return imagenAfiliados;
};
