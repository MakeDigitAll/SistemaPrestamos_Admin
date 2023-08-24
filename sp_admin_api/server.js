const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require("./app/routes/routes");
const db = require("./app/models");
const createAdmin = require("./app/utils/createAdmin");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ limit: "4mb", extended: true }));
app.options("*", cors(corsOptions));

//por si la base de datos cambia
db.sequelize.sync({ alter: true }).then(() => {});
//force: true

//crear administrador si no existe
//createAdmin.createAdministratorIfNotExist();

// db.nivelesFidelidad.create({
//   nombreNivelFidelidad: "Bronce",
//   descuento: 0,
//   numeroMesesMinimo: 0,
//   numeroMesesMaximo: 3,
// });

// db.nivelesFidelidad.create({
//   nombreNivelFidelidad: "Plata",
//   descuento: 3,
//   numeroMesesMinimo: 4,
//   numeroMesesMaximo: 8,
// });

// db.nivelesFidelidad.create({
//   nombreNivelFidelidad: "Oro",
//   descuento: 6,
//   numeroMesesMinimo: 9,
//   numeroMesesMaximo: 12,
// });

// db.tipoSuscripciones.create({
//   nombreSuscripcion: "Básica",
//   montoDesde: 0,
//   montoHasta: 10000,
//   numeroUsuariosMax: 100,
//   costoMembresia: 500,
// });

// db.tipoSuscripciones.create({
//   nombreSuscripcion: "Estandar",
//   montoDesde: 10001,
//   montoHasta: 30000,
//   numeroUsuariosMax: 500,
//   costoMembresia: 1000,
// });

// db.tipoSuscripciones.create({
//   nombreSuscripcion: "Avanzada",
//   montoDesde: 30001,
//   montoHasta: 60000,
//   numeroUsuariosMax: 1000,
//   costoMembresia: 1500,
// });

// db.tipoSuscripciones.create({
//   nombreSuscripcion: "Premium",
//   montoDesde: 60001,
//   montoHasta: 100000,
//   numeroUsuariosMax: 2000,
//   costoMembresia: 200,
// });

//Variables de entorno
require("dotenv").config();

// Rutas
app.use("/", routes);

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
