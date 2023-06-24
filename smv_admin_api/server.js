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

//insertar un administrador (correo_electronico, passwd, nombres, apellidos) (sesion iniciada y descomentar la linea 19  - 23) y regargar el servidor para que se cree el registro despues comentar la linea 19 - 23

//db.administradores.create({
//  correo_electronico: "hola@makedigitall.com",
//  passwd: "rm7DS6YkR",
//  nombres: "Prueba",
//  apellidos: "App",
//});

// Rutas
app.use("/", routes);

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
