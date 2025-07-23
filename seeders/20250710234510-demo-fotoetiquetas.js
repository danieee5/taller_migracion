'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Obtener todos los IDs de fotos y etiquetas
    const [fotos] = await queryInterface.sequelize.query(`SELECT id FROM fotos`);
    const [etiquetas] = await queryInterface.sequelize.query(`SELECT id FROM etiqueta`);

    const combinaciones = [];

    fotos.forEach(foto => {
      // 2. Escoger 2 etiquetas aleatorias
      const etiquetasRandom = etiquetas
        .sort(() => 0.5 - Math.random())
        .slice(0, 2); // puedes cambiar a 3 si quieres 3 etiquetas

      // 3. Crear la relación foto-etiqueta
      etiquetasRandom.forEach(etiqueta => {
        combinaciones.push({
          foto_id: foto.id,
          etiqueta_id: etiqueta.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    });

    // 4. Insertar todas las relaciones
    await queryInterface.bulkInsert('fotoetiqueta', combinaciones);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotoetiqueta', null, {});
  }
};