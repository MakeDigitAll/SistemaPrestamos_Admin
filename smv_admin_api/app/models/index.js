const dbConfig = require("../config/dbconfig.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  logging: false, // Disable query logging
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.administradores = require("./modelAdmin.js")(sequelize, Sequelize);
db.usuarios = require("./modelUsuarios.js")(sequelize, Sequelize);
db.prestamos = require("./modelPrestamos.js")(sequelize, Sequelize);
db.suscripciones = require("./modelSuscripciones.js")(sequelize, Sequelize);

// Asociaciones entre usuarios y suscripciones
db.usuarios.hasOne(db.suscripciones, {
  foreignKey: "idUsuario",
  as: "suscripcion",
});
db.suscripciones.belongsTo(db.usuarios, {
  foreignKey: "idUsuario",
  as: "usuarios",
});

module.exports = db;
