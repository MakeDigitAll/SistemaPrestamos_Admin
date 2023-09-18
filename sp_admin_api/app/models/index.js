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

//Modelos Usuarios
db.administradores = require("./modelAdmin.js")(sequelize, Sequelize);
db.usuariosPrestamistas = require("./modelUsuariosPrestamistas.js")(
  sequelize,
  Sequelize
);
db.usuariosAfiliados = require("./modelUsuariosAfiliados.js")(
  sequelize,
  Sequelize
);
//Modelos Imagenes
db.imagenAdministrador = require("./images/modelImagenAdmin.js")(
  sequelize,
  Sequelize
);
db.imagenPrestamista = require("./images/modelImagenPrestamistas.js")(
  sequelize,
  Sequelize
);
db.imagenAfiliado = require("./images/modelImagenAfiliados.js")(
  sequelize,
  Sequelize
);
//Modelo Prestamos
db.prestamos = require("./modelPrestamos.js")(sequelize, Sequelize);
//Modelo DatosUsuarioSuscripcion
db.datosUsuarioSuscripciones = require("./modelDatosUsuarioSuscripcion.js")(
  sequelize,
  Sequelize
);
//Modelo de NivelesFidelidad
db.nivelesFidelidad = require("./modelNivelesFidelidad.js")(
  sequelize,
  Sequelize
);
//Modelo de TipoSuscripcion
db.tipoSuscripciones = require("./modelTipoSuscripcion.js")(
  sequelize,
  Sequelize
);
//Modelo AmistadPrestamistaClientes
db.amistadPrestamistaClientes = require("./modelAmistadPrestamistaClientes.js")(
  sequelize,
  Sequelize
);
//Modelo de Notificaciones Afiliados
db.notificationsAfiliados =
  require("./notifications/modelNotificationsAfiliado.js")(
    sequelize,
    Sequelize
  );
//Modelo de Notificaciones Prestamistas
db.notificationsPrestamistas =
  require("./notifications/modelNotificationsPrestamistas.js")(
    sequelize,
    Sequelize
  );
//Modelo de Notificaciones Administrador
db.notificationsAdministradores =
  require("./notifications/modelNotificationsAdministradores.js")(
    sequelize,
    Sequelize
  );
//Modelo de Solicitud de Prestamo
db.solicitudPrestamo = require("./modelSolicitudPrestamo.js")(
  sequelize,
  Sequelize
);

//Modelo HistorialPagos
db.historialPagos = require("./modelHistorialPagos.js")(sequelize, Sequelize);

//Modelo Suscripciones
db.suscripciones = require("./modelSuscripciones.js")(sequelize, Sequelize);

//ok-----------------------------------Asociaciones de imagenes-----------------------------------//
//Asociacion entre imagen administrador y administrador
db.administradores.hasOne(db.imagenAdministrador, {
  foreignKey: "idAdministrador",
  as: "imagen_administrador",
});
db.imagenAdministrador.belongsTo(db.administradores, {
  foreignKey: "idAdministrador",
  as: "administrador_imagen",
});

// Asociacion entre usuariosPrestamistas e imagenesPrestamistas
db.usuariosPrestamistas.hasOne(db.imagenPrestamista, {
  foreignKey: "idUsuarioPrestamista",
  as: "imagen_prestamista",
});
db.imagenPrestamista.belongsTo(db.usuariosPrestamistas, {
  foreignKey: "idUsuarioPrestamista",
  as: "prestamista_imagen",
});

// Asociacion entre usuariosAfiliados e imagenesAfiliados
db.usuariosAfiliados.hasOne(db.imagenAfiliado, {
  foreignKey: "idUsuarioAfiliado",
  as: "imagen_afiliado",
});
db.imagenAfiliado.belongsTo(db.usuariosAfiliados, {
  foreignKey: "idUsuarioAfiliado",
  as: "afiliado_imagen",
});

// --------------------------------Asociacion de Usuarios y Modelos --------------------------------//

//Asociacion entre usuariosPresatmistas y prestamos N:M
db.usuariosPrestamistas.belongsToMany(db.prestamos, {
  through: "PrestamosUsuariosPrestamistas",
  as: "prestamos",
  foreignKey: "idUsuarioPrestamista",
});
db.prestamos.belongsToMany(db.usuariosPrestamistas, {
  through: "PrestamosUsuariosPrestamistas",
  as: "usuariosPrestamistas",
  foreignKey: "idPrestamo",
});

//Asociacion entre usuariosAfiliados y prestamos N:M
db.usuariosAfiliados.belongsToMany(db.prestamos, {
  through: "PrestamosUsuariosAfiliados",
  as: "prestamos",
  foreignKey: "idUsuarioAfiliado",
});
db.prestamos.belongsToMany(db.usuariosAfiliados, {
  through: "PrestamosUsuariosAfiliados",
  as: "usuariosAfiliados",
  foreignKey: "idPrestamo",
});

//Asociacion entre usuariosPrestamistas y datosUsuarioSuscripciones 1:1
db.usuariosPrestamistas.hasOne(db.datosUsuarioSuscripciones, {
  foreignKey: "idUsuarioPrestamista",
  as: "datos_usuarios_suscripcion_prestamista",
});
db.datosUsuarioSuscripciones.belongsTo(db.usuariosPrestamistas, {
  foreignKey: "idUsuarioPrestamista",
  as: "prestamista_datos_usuarios_suscripcion",
});

//Asociacion entre usuarioPresatmistas y suscripciones 1 usuario puede tener muchas suscripciones pero una suscripcion solo puede tener un usuario
db.usuariosPrestamistas.hasMany(db.suscripciones, {
  foreignKey: "idUsuarioPrestamista",
  as: "suscripciones_prestamista",
});
db.suscripciones.belongsTo(db.usuariosPrestamistas, {
  foreignKey: "idUsuarioPrestamista",
  as: "prestamista_suscripciones",
});

//asociacion entre suscripciones y nivelesFidelidad 1 suscripcion solo puede tener un nivel de fidelidad pero uno o muchos niveles de fidelidad pueden pertenecer a varias una suscripciones
db.suscripciones.belongsTo(db.nivelesFidelidad, {
  foreignKey: "idNivelFidelidad",
  as: "suscripcion_nivel_fidelidad",
});
db.nivelesFidelidad.hasMany(db.suscripciones, {
  foreignKey: "idNivelFidelidad",
  as: "nivel_fidelidad_suscripcion",
});

//asociacion entre suscripciones y tipoSuscripciones 1 suscripcion solo puede tener un tipo de suscripcion pero uno o muchos tipos de suscripcion pueden tener una suscripcion
db.suscripciones.belongsTo(db.tipoSuscripciones, {
  foreignKey: "idTipoSuscripcion",
  as: "suscripcion_tipo_suscripcion",
});
db.tipoSuscripciones.hasMany(db.suscripciones, {
  foreignKey: "idTipoSuscripcion",
  as: "tipo_suscripcion_suscripcion",
});

//asociacion entre amistades y usuariosPresatmistas  1 usuario prestamista puede tener muchos usuarios afiliados pero un usuario afiliado solo puede tener un usuario prestamista
db.usuariosPrestamistas.hasMany(db.amistadPrestamistaClientes, {
  foreignKey: "idUsuarioPrestamista",
  as: "amistades_prestamista",
});
db.amistadPrestamistaClientes.belongsTo(db.usuariosPrestamistas, {
  foreignKey: "idUsuarioPrestamista",
  as: "prestamista_amistades",
});

//asociacion entre amistades y usuariosAfiliados  1 usuario afiliado puede tener muchos usuarios prestamistas pero un usuario prestamista solo puede tener un usuario afiliado
db.usuariosAfiliados.hasMany(db.amistadPrestamistaClientes, {
  foreignKey: "idUsuarioAfiliado",
  as: "amistades_afiliado",
});
db.amistadPrestamistaClientes.belongsTo(db.usuariosAfiliados, {
  foreignKey: "idUsuarioAfiliado",
  as: "afiliado_amistades",
});

//asociacion entre notificaciones prestamistas y usuariosPresatmistas  1 usuario prestamista puede tener muchas notificaciones pero una notificacion solo puede tener un usuario prestamista
db.usuariosPrestamistas.hasMany(db.notificationsPrestamistas, {
  foreignKey: "idUsuarioPrestamista",
  as: "notificaciones_prestamista",
});
db.notificationsPrestamistas.belongsTo(db.usuariosPrestamistas, {
  foreignKey: "idUsuarioPrestamista",
  as: "prestamista_notificaciones",
});

//asociacion entre notificaciones afiliados y usuariosAfiliados  1 usuario afiliado puede tener muchas notificaciones pero las notificaciones solo pueden tener un usuario afiliado
db.usuariosAfiliados.hasMany(db.notificationsAfiliados, {
  foreignKey: "idUsuarioAfiliado",
  as: "notifications_afiliados",
});
db.notificationsAfiliados.belongsTo(db.usuariosAfiliados, {
  foreignKey: "idUsuarioAfiliado",
  as: "afiliado_notifications",
});

//Asociacion entre usuariosPrestamistas y solicitudesPrestamos 1 usuario prestamista puede hacer muchas solicitudes de prestamos pero una solicitud de prestamo solo puede tener un usuario prestamista
db.usuariosPrestamistas.hasMany(db.solicitudPrestamo, {
  foreignKey: "idUsuarioPrestamista",
  as: "solicitudes_prestamista",
});
db.solicitudPrestamo.belongsTo(db.usuariosPrestamistas, {
  foreignKey: "idUsuarioPrestamista",
  as: "prestamista_solicitudes",
});

//Asociacion entre usuariosAfiliados y solicitudesPrestamos 1 usuario afiliado solo puede tener una solicitud de prestamo pero una solicitud de prestamo solo puede tener un usuario afiliado
db.usuariosAfiliados.hasMany(db.solicitudPrestamo, {
  foreignKey: "idUsuarioAfiliado",
  as: "solicitudes_afiliado",
});
db.solicitudPrestamo.belongsTo(db.usuariosAfiliados, {
  foreignKey: "idUsuarioAfiliado",
  as: "afiliado_solicitudes",
});

//Asociar historial de pagos con prestamos a traves de la tabla intermedia prestamos-historialPagos
db.prestamos.belongsToMany(db.historialPagos, {
  through: "prestamosHistorialPagos",
  as: "historial_pagos",
  foreignKey: "idPrestamo",
});
db.historialPagos.belongsToMany(db.prestamos, {
  through: "prestamosHistorialPagos",
  as: "prestamos",
  foreignKey: "idHistorialPago",
});

module.exports = db;
