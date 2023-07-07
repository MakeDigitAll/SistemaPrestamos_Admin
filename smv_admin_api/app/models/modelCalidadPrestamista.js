module.exports = (sequelize, Sequelize) => {
  const Prestamos = sequelize.define(
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
        montoDesde: {
          type: Sequelize.DECIMAL,
          allowNull: false,
        },
        montoHasta: {
          type: Sequelize.DECIMAL,
          allowNull: false,
        },
        numeroUsuarios: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
