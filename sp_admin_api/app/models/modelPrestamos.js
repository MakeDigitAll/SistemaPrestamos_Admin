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
      tiempoPrestamo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mesesRestantes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tasaInteresGeneral: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      montoPorPagar: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      tasaInteresVencido: {
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
      estadoPrestamo: {
        type: Sequelize.STRING,
        validate: {
          len: [1, 30], // Mínimo 1 caracter, máximo 30 caracteres
        },
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
  return Prestamos;
};
