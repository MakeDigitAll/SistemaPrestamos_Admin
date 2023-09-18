module.exports = (sequelize, Sequelize) => {
  const NotificationsAdministradores = sequelize.define(
    "notificationsAdministradores",
    {
      idNotificacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      isPrestamista: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    }
  );

  return NotificationsAdministradores;
};
