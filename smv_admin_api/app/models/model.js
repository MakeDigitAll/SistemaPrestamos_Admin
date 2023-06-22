module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("administradores", {
      idadmin: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      correo_electronico: {
        type: Sequelize.STRING
      },
      passwd: {
        type: Sequelize.STRING
      },
      nombres: {
        type: Sequelize.STRING
      },
      apellidos: {
        type: Sequelize.STRING
      },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }

    });
  
    return Model;
  };
  