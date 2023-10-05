//importar las variables de entorno
const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "development"; // Si no se establece NODE_ENV, se asumirá desarrollo
if (env === "development") {
  dotenv.config({ path: ".env.dev" }); // Carga las variables de entorno para desarrollo
} else if (env === "production") {
  dotenv.config({ path: ".env.prod" }); // Carga las variables de entorno para producción
}

module.exports = {
  HOST: "localhost",
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: "sistema_prestamos",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
