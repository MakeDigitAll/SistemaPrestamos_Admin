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
      tasaInteresMinima: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      tasaInteresGeneral: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      pagoMensualInteresMinimo: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      pagoMensualInteresGeneral: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      pagoTotalInteresMinimo: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      pagoTotalInteresGeneral: {
        type: Sequelize.DECIMAL,
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
