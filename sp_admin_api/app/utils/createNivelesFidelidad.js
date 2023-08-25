const db = require("../models");

async function createNivelesFidelidadIfNotExist() {
  const nivelesFidelidadData = [
    {
      nombreNivelFidelidad: "Bronce",
      descuento: 0,
      numeroMesesMinimo: 0,
      numeroMesesMaximo: 3,
    },
    {
      nombreNivelFidelidad: "Plata",
      descuento: 3,
      numeroMesesMinimo: 4,
      numeroMesesMaximo: 8,
    },
    {
      nombreNivelFidelidad: "Oro",
      descuento: 6,
      numeroMesesMinimo: 9,
      numeroMesesMaximo: 12,
    },
  ];

  try {
    for (const nivelData of nivelesFidelidadData) {
      const existingNivel = await db.nivelesFidelidad.findOne({
        where: {
          nombreNivelFidelidad: nivelData.nombreNivelFidelidad,
        },
      });

      if (!existingNivel) {
        await db.nivelesFidelidad.create(nivelData);
        console.log(`Nivel "${nivelData.nombreNivelFidelidad}" creado`);
      }
    }
  } catch (error) {
    console.error("Error al crear niveles de fidelidad", error);
  }
}

module.exports = { createNivelesFidelidadIfNotExist };
