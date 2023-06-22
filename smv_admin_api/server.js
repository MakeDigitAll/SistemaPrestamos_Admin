const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = require("./app/models");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.options("*", cors());

// Obtain all administrators
app.get("/administradores", (req, res) => {
  db.administradores
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los administradores.",
      });
    });
});

// Create and save a new administrator
app.post("/administradores", (req, res) => {
  db.administradores
    .create(req.query)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al crear el administrador en la base de datos.",
      });
    });
});

// Check if the administrator exists in the database and if the password is correct
app.get("/administradores/login", (req, res) => {
  db.administradores
    .findOne({
      where: {
        correo_electronico: req.query.correo_electronico,
        passwd: req.query.passwd,
      },
    })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(500).send({
          message: "Usuario o contraseña incorrectos.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error al comprobar si el administrador existe en la base de datos.",
      });
    });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
