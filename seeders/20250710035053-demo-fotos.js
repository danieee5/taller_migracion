'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('fotos', [
      {
        titulo: 'Ejemplo 1',
        descripcion: 'Una imagen de ejemplo',
        calificacion: 4.5,
        ruta: 'public/images/foto1.jpg',
        createdAt: now,
        updatedAt: now
      },
      {
        titulo: 'Ejemplo 2',
        descripcion: 'Otra imagen',
        calificacion: 3.8,
        ruta: 'images/foto2.jpg',
        createdAt: now,
        updatedAt: now
      },
      {
        titulo: 'Flor',
        descripcion: 'Una flor bonita',
        calificacion: 4.8,
        ruta: 'images/foto3.jpg',
        createdAt: now,
        updatedAt: now
      },
      {
        titulo: 'Perrito',
        descripcion: 'Mi perrito feliz',
        calificacion: 5.0,
        ruta: 'images/foto4.jpg',
        createdAt: now,
        updatedAt: now
      },
      {
        titulo: 'Playa',
        descripcion: 'Día soleado en la playa',
        calificacion: 4.5,
        ruta: 'images/foto5.jpg',
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotos', null, {});
  }
};