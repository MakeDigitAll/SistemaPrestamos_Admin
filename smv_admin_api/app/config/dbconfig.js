module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "935115",
    DB: "sistema_prestamos_admin",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };