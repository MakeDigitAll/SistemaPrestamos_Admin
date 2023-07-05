module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define(
    "prestamos",
    {
      idPrestamo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "idUsuario",
        },
      },
      monto: {
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
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1, 255], // Mínimo 1 caracter, máximo 255 caracteres
        },
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return Model;
};
