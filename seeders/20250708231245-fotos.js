"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Fotos", [
      {
        titulo: "Ejemplo 1",
        descripcion: "Una imagen de ejemplo",
        calificacion: 4.5,
        ruta: "ruta/imagen1.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: "Ejemplo 2",
        descripcion: "Otra imagen",
        calificacion: 3.8,
        ruta: "ruta/imagen2.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Fotos", null, {});
  }
};