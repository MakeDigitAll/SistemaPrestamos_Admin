module.exports = (sequelize, Sequelize) => {
  const NotificationsPrestamistas = sequelize.define(
    "notificationsPrestamistas",
    {
      idNotificacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUsuarioPrestamista: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuariosPrestamistas",
          key: "idUsuarioPrestamista",
        },
      },
      idUsuarioNotification: {
        type: Sequelize.INTEGER,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    }
  );

  return NotificationsPrestamistas;
};
