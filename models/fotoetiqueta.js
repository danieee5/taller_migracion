'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FotoEtiqueta extends Model {
    static associate(models) {
      FotoEtiqueta.belongsTo(models.foto, {   // ✅ minúscula
        foreignKey: 'foto_id',
        as: 'foto'
      });

      FotoEtiqueta.belongsTo(models.etiqueta, {  // ✅ minúscula
        foreignKey: 'etiqueta_id',
        as: 'etiqueta'
      });
    }
  }

  FotoEtiqueta.init({
    foto_id: DataTypes.INTEGER,
    etiqueta_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'fotoetiqueta',
    tableName: 'fotoetiqueta',
  });

  return FotoEtiqueta;
};