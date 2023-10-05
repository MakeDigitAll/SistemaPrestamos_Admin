const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require("./app/routes/routes");
const db = require("./app/models");
const createAdmin = require("./app/utils/createAdmin");
const createNivelesFidelidad = require("./app/utils/createNivelesFidelidad");
const createTipoSuscripciones = require("./app/utils/createTipoSuscripciones");

//Variables de entorno
const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "development"; // Si no se establece NODE_ENV, se asumirá desarrollo
if (env === "development") {
  dotenv.config({ path: ".env.dev" }); // Carga las variables de entorno para desarrollo
} else if (env === "production") {
  dotenv.config({ path: ".env.prod" }); // Carga las variables de entorno para producción
}

const corsOptions = {
  origin: [process.env.BASE_URL, process.env.BASE_URL_HTTPS],
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
createAdmin.createAdministratorIfNotExist();

//crear niveles de fidelidad si no existen
createNivelesFidelidad.createNivelesFidelidadIfNotExist();

//crear tipos de suscripciones si no existen
createTipoSuscripciones.createTipoSuscripcionesIfNotExist();

// Rutas
app.use("/", routes);

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
  console.log(`Entorno: ${env}`);
});
