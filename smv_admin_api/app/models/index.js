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
db.usuariosPrestamistas = require("./modelUsuariosPrestamistas.js")(
  sequelize,
  Sequelize
);
db.usuariosAfiliados = require("./modelUsuariosAfiliados.js")(
  sequelize,
  Sequelize
);
db.prestamos = require("./modelPrestamos.js")(sequelize, Sequelize);
db.suscripciones = require("./modelSuscripciones.js")(sequelize, Sequelize);
db.calidadPrestamista = require("./modelCalidadPrestamista.js")(
  sequelize,
  Sequelize
);

// Asociaciones entre usuarios y suscripciones
db.usuariosPrestamistas.hasOne(db.suscripciones, {
  foreignKey: "idUsuarioPrestamista",
  as: "suscripcion",
});
db.suscripciones.belongsTo(db.usuariosPrestamistas, {
  foreignKey: "idUsuarioPrestamista",
  as: "usuariosPrestamistas",
});

// Asociación entre usuarios prestamistas y préstamos
db.usuariosPrestamistas.hasMany(db.prestamos, {
  foreignKey: "idUsuarioPrestamista",
  as: "prestamosPrestamista",
});
db.prestamos.belongsTo(db.usuariosPrestamistas, {
  foreignKey: "idUsuarioPrestamista",
  as: "usuarioPrestamista",
});

// Asociación entre usuarios afiliados y préstamos
db.usuariosAfiliados.hasMany(db.prestamos, {
  foreignKey: "idUsuarioAfiliado",
  as: "prestamosAfiliado",
});
db.prestamos.belongsTo(db.usuariosAfiliados, {
  foreignKey: "idUsuarioAfiliado",
  as: "usuarioAfiliado",
});

// Asociación entre usuarios Prestamistas y Calidad Prestamista, 1 usuario prestamista solo puede tener 1 calidad prestamista (1 a 1) y 1 calidad prestamista puede pertenecer a 1 usuario prestamista (1 a 1)
db.usuariosPrestamistas.hasOne(db.calidadPrestamista, {
  foreignKey: "idUsuarioPrestamista",
  as: "calidadPrestamista",
});
db.calidadPrestamista.belongsTo(db.usuariosPrestamistas, {
  foreignKey: "idUsuarioPrestamista",
  as: "usuariosPrestamistas",
});


module.exports = db;
