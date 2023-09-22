module.exports = (sequelize, Sequelize) => {
  const SolicitudPrestamo = sequelize.define(
    "solicitudPrestamo",
    {
      idPrestamo: {
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
      idUsuarioAfiliado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuariosAfiliados",
          key: "idUsuarioAfiliado",
        },
      },
      montoPrestado: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      tiempoPrestamo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tasaInteresGeneral: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      tasaInteresVencido: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      isSemanal: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return SolicitudPrestamo;
};
