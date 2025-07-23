'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Etiqueta extends Model {
    static associate(models) {
      Etiqueta.belongsToMany(models.foto, {
        through: 'fotoetiqueta',
        foreignKey: 'etiqueta_id',
        otherKey: 'foto_id',
        as: 'fotos' // ← AGREGAR ESTO
      });
    }
  }

  Etiqueta.init({
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'etiqueta',
    tableName: 'etiqueta',
    freezeTableName: true,
    timestamps: true
  });

  return Etiqueta;
};