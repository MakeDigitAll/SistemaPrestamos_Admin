module.exports = (sequelize, Sequelize) => {
  const Suscripciones = sequelize.define(
    "suscripciones",
    {
      idSuscripcion: {
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
      idNivelFidelidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "nivelesFidelidad",
          key: "idNivelFidelidad",
        },
      },
      idTipoSuscripcion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tipoSuscripciones",
          key: "idTipoSuscripcion",
        },
      },
      fechaInicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fechaFin: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      tiempoMeses: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      pagosAlCorriente: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );

  return Suscripciones;
};
