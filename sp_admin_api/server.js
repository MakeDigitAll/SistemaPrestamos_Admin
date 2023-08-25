const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require("./app/routes/routes");
const db = require("./app/models");
const createAdmin = require("./app/utils/createAdmin");
const createNivelesFidelidad = require("./app/utils/createNivelesFidelidad");
const createTipoSuscripciones = require("./app/utils/createTipoSuscripciones");
const {
  createNivelFidelidad,
} = require("./app/controllers/controllerNivelFidelidad");

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

//crear niveles de fidelidad si no existen
//createNivelesFidelidad.createNivelesFidelidadIfNotExist();

//crear tipos de suscripciones si no existen
//createTipoSuscripciones.createTipoSuscripcionesIfNotExist();

//Variables de entorno
require("dotenv").config();

// Rutas
app.use("/", routes);

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
