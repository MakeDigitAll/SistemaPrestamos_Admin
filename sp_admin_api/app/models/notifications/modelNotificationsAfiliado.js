module.exports = (sequelize, Sequelize) => {
    const NotificationsAfiliado = sequelize.define("NotificationsAfiliado", {
      idNotificacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUsuarioAfiliado: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuariosAfiliados",
          key: "idUsuarioAfiliado",
        },
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
    });
  
    return NotificationsAfiliado;
  };
  