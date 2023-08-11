module.exports = (sequelize, Sequelize) => {
  const AmistadPrestamistaClientes = sequelize.define(
    "amistadPrestamistaClientes",
    {
      id: {
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
      idUsuarioAfiliado: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuariosAfiliados",
          key: "idUsuarioAfiliado",
        },
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "pendiente", //'pendiente', 'aceptada', 'rechazada'
      },
    }
  );

  return AmistadPrestamistaClientes;
};
