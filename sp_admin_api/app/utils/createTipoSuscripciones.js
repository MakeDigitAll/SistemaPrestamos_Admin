const db = require("../models");

async function createTipoSuscripcionesIfNotExist() {
  const tipoSuscripcionesData = [
    {
      nombreSuscripcion: "Básica",
      montoDesde: 0,
      montoHasta: 10000,
      numeroUsuariosMax: 100,
      costoMembresia: 500,
    },
    {
      nombreSuscripcion: "Estandar",
      montoDesde: 10001,
      montoHasta: 30000,
      numeroUsuariosMax: 500,
      costoMembresia: 1000,
    },
    {
      nombreSuscripcion: "Avanzada",
      montoDesde: 30001,
      montoHasta: 60000,
      numeroUsuariosMax: 1000,
      costoMembresia: 1500,
    },
    {
      nombreSuscripcion: "Premium",
      montoDesde: 60001,
      montoHasta: 100000,
      numeroUsuariosMax: 2000,
      costoMembresia: 200,
    },
  ];

  try {
    for (const tipoSuscripcionData of tipoSuscripcionesData) {
      const existingTipoSuscripcion = await db.tipoSuscripciones.findOne({
        where: {
          nombreSuscripcion: tipoSuscripcionData.nombreSuscripcion,
        },
      });

      if (!existingTipoSuscripcion) {
        await db.tipoSuscripciones.create(tipoSuscripcionData);
        console.log(
          `Tipo de Suscripción "${tipoSuscripcionData.nombreSuscripcion}" creado`
        );
      }
    }
  } catch (error) {
    console.error("Error al crear tipos de suscripciones", error);
  }
}

module.exports = { createTipoSuscripcionesIfNotExist };
