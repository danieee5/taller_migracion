'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('fotoetiqueta', {
      fields: ['foto_id'],
      type: 'foreign key',
      name: 'fk_fotoetiqueta_foto', // nombre personalizado
      references: {
        table: 'Fotos',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('fotoetiqueta', {
      fields: ['etiqueta_id'],
      type: 'foreign key',
      name: 'fk_fotoetiqueta_etiqueta',
      references: {
        table: 'etiqueta',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('fotoetiquetas', 'fk_fotoetiqueta_foto');
    await queryInterface.removeConstraint('fotoetiquetas', 'fk_fotoetiqueta_etiqueta');
  }
};