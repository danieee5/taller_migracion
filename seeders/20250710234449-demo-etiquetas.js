'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('etiqueta', [
      { texto: 'Naturaleza', createdAt: new Date(), updatedAt: new Date() },
      { texto: 'Animales', createdAt: new Date(), updatedAt: new Date() },
      { texto: 'Vacaciones', createdAt: new Date(), updatedAt: new Date() },
      { texto: 'Familia', createdAt: new Date(), updatedAt: new Date() },
      { texto: 'Arte', createdAt: new Date(), updatedAt: new Date() },
      { texto: 'Comida', createdAt: new Date(), updatedAt: new Date() },
      { texto: 'Paisaje', createdAt: new Date(), updatedAt: new Date() },
      { texto: 'Ciudad', createdAt: new Date(), updatedAt: new Date() },
      { texto: 'Mascotas', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('etiqueta', null, {});
  }
};