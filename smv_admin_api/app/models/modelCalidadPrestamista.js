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
        //money
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
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return CalidadPrestamista;
};
