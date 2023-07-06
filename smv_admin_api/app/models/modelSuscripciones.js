module.exports = (sequelize, Sequelize) => {
  const Suscripciones = sequelize.define(
    "suscripciones",
    {
      idSuscripcion: {
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
      tipoSuscripcion: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1, 50], // Mínimo 1 caracter, máximo 50 caracteres
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
      estadoSuscripcion: {
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

  return Suscripciones;
};
