const db = require("../models");
const bcrypt = require("bcrypt");

const nombre = "Pablo";
const apellido = "Alvarez";
const correo = "pablo@makedigitall.com";
const password = "";

async function createAdministratorIfNotExist() {
  try {
    const existingAdmin = await db.administradores.findOne({
      where: {
        correoElectronico: correo,
      },
    });

    if (!existingAdmin) {
      // Encrypt the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await db.administradores.create({
        correoElectronico: correo,
        adminPassword: hashedPassword,
        nombres: nombre,
        apellidos: apellido,
      });
      console.log("Administrador creado");
    }
  } catch (error) {
    console.error("Error al crear administrador", error);
  }
}

// Export the db object and the createAdministratorIfNotExist function
module.exports = { createAdministratorIfNotExist };
