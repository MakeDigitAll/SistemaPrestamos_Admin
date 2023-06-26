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
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return Model;
};
