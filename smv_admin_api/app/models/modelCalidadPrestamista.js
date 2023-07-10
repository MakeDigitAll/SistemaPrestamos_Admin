module.exports = (sequelize, Sequelize) => {
  const CalidadPrestamista = sequelize.define(
    "calidadPrestamista",
    {
      idCalidadPrestamista: {
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
      montoDesde: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      montoHasta: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      numeroUsuarios: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      nombreNivel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      costoMembresia: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return CalidadPrestamista;
};
