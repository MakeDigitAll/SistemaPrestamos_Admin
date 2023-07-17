module.exports = (sequelize, Sequelize) => {
  const TipoSuscripcion = sequelize.define(
    "tipoSuscripciones",
    {
      idTipoSuscripcion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombreSuscripcion: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1, 50], // Mínimo 1 caracter, máximo 50 caracteres
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
      numeroUsuariosMax: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      costoMembresia: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isUpdated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return TipoSuscripcion;
};
