module.exports = (sequelize, Sequelize) => {
  const HistorialPagos = sequelize.define(
    "historialPagos",
    {
      idHistorialPago: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idPrestamo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "prestamos",
          key: "idPrestamo",
        },
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
      fechaPago: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      montoPagado: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      montoRestante: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      intereses: {
        type: Sequelize.DECIMAL,
      },
      tipoPago: {
        // pago anticipado, pago a tiempo, pago atrasado
        type: Sequelize.STRING,
        allowNull: false,
      },
      estadoPago: {
        // pendiente, pagado, rechazado
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return HistorialPagos;
};
