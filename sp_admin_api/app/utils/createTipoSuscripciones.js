const db = require("../models");

async function createTipoSuscripcionesIfNotExist() {
  const tipoSuscripcionesData = [
    {
      nombreSuscripcion: "Básica",
      montoDesde: 0,
      montoHasta: 200000,
      numeroUsuariosMax: 20,
      costoMembresia: 499,
    },
    {
      nombreSuscripcion: "Estandar",
      montoDesde: 200001,
      montoHasta: 400000,
      numeroUsuariosMax: 40,
      costoMembresia: 999,
    },
    {
      nombreSuscripcion: "Avanzada",
      montoDesde: 400001,
      montoHasta: 600000,
      numeroUsuariosMax: 60,
      costoMembresia: 1499,
    },
    {
      nombreSuscripcion: "Premium",
      montoDesde: 600001,
      montoHasta: 800000,
      numeroUsuariosMax: 80,
      costoMembresia: 1999,
    },
    {
      nombreSuscripcion: "Ultimate",
      montoDesde: 800001,
      montoHasta: 1000000,
      numeroUsuariosMax: 100,
      costoMembresia: 2499,
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
