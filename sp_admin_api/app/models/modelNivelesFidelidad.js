module.exports = (sequelize, Sequelize) => {
  const NivelesFidelidad = sequelize.define(
    "nivelesFidelidad",
    {
      idNivelFidelidad: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombreNivelFidelidad: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1, 50], // Minimum 1 character, maximum 50 characters
        },
      },
      descuento: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numeroMesesMinimo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numeroMesesMaximo: {
        type: Sequelize.INTEGER,
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
      tableName: "nivelesFidelidad", // Specify the table name explicitly
      timestamps: false, // If you don't want timestamps in the table
    }
  );
  return NivelesFidelidad;
};
