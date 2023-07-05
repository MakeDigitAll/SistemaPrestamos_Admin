module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define(
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
          len: [1, 255], // Mínimo 1 caracter, máximo 255 caracteres
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
