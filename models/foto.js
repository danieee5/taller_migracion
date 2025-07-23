'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Foto extends Model {
    static associate(models) {
      Foto.belongsToMany(models.etiqueta, {
        through: 'fotoetiqueta',
        foreignKey: 'foto_id',
        otherKey: 'etiqueta_id',
        as: 'etiquetas' // ← AGREGAR ESTO
      });
    }
  }

  Foto.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    calificacion: DataTypes.FLOAT,
    ruta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'foto',
    tableName: 'fotos',
    freezeTableName: true,
  });

  return Foto;
};