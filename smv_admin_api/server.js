const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require("./app/routes/routes");
const db = require("./app/models");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options("*", cors());

//por si la base de datos cambia
db.sequelize.sync({ alter: true }).then(() => {});
//force: true

//db.administradores.create({
//  correoElectronico: "pablo@makedigitall.com",
//  adminPassword: "123",
//  nombres: "Pablo",
//  apellidos: "Alvarez",
//});

// Rutas
app.use("/", routes);

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
