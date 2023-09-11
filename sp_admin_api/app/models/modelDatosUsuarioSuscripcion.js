module.exports = (sequelize, Sequelize) => {
  const DatosUsuarioSuscripcion = sequelize.define(
    "datosUsuarioSuscripciones",
    {
      idDatosUsuarioSuscripcion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUsuarioPrestamista: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      montoAPrestarDesde: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      montoAPrestarHasta: {
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
  return DatosUsuarioSuscripcion;
};
