module.exports = (sequelize, Sequelize) => {
  const Prestamos = sequelize.define(
    "prestamos",
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
      montoPorPagar: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      tasaInteres: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      fechaPrestamo: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fechaProximoPago: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fechaFinPago: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      historialPagos: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1, 255], // Mínimo 1 caracter, máximo 255 caracteres
        },
      },
      estadoPrestamo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1, 30], // Mínimo 1 caracter, máximo 30 caracteres
        },
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return Prestamos;
};
