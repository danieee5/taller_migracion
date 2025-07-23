'use strict';
const express = require('express');
const router = express.Router();
const db = require('../models');

// Obtener modelos de Sequelize - forma más confiable
const Foto = db.sequelize.models.foto;
const Etiqueta = db.sequelize.models.etiqueta;

// Middleware para verificar modelos
router.use((req, res, next) => {
  if (!Foto || !Etiqueta) {
    console.error('❌ Modelos no disponibles');
    return res.status(500).json({ 
      error: 'Modelos no cargados correctamente',
      availableModels: Object.keys(db.sequelize.models) 
    });
  }
  next();
});

/**
 * @route GET /fotos/findAll/view
 * @description Obtiene todas las fotos con sus etiquetas (vista HTML)
 */
router.get('/findAll/view', async (req, res, next) => {
  try {
    console.log('\n🔥 INICIO DEBUG - Consultando fotos con etiquetas 🔥');
    
    const fotos = await Foto.findAll({
      attributes: { exclude: ["updatedAt"] },
      include: [{
        model: Etiqueta,
        as: 'etiquetas',
        through: { attributes: [] },
        required: false
      }],
      logging: console.log
    });

    console.log('\n✅ RESULTADOS OBTENIDOS:');
    console.log(`📊 Total de fotos: ${fotos.length}`);
    
    if (!fotos || fotos.length === 0) {
      console.log('ℹ️ No se encontraron fotos');
      return res.render('fotos', { 
        title: 'Fotos', 
        arrFotos: [],
        message: 'No se encontraron fotos'
      });
    }

    // Debug detallado
    const primeraFoto = fotos[0];
    console.log('\n🔍 EXAMINANDO PRIMERA FOTO:');
    console.log(`🆔 ID: ${primeraFoto.id}`);
    console.log(`🏷️ Título: ${primeraFoto.titulo}`);
    console.log('🔹 Objeto completo:', JSON.stringify(primeraFoto.get({ plain: true }), null, 2));
    
    console.log('\n🔎 PROPIEDADES DISPONIBLES:');
    console.log(Object.keys(primeraFoto));
    console.log('¿Tiene propiedad "etiquetas"?', 'etiquetas' in primeraFoto);
    
    if (primeraFoto.etiquetas) {
      console.log(`📌 Número de etiquetas: ${primeraFoto.etiquetas.length}`);
      if (primeraFoto.etiquetas.length > 0) {
        console.log('🏷️ Etiquetas:', primeraFoto.etiquetas.map(e => e.texto).join(', '));
      }
    }

    console.log('\n🔥 FIN DEBUG 🔥');
    
    res.render('fotos', { 
      title: 'Galería de Fotos',
      arrFotos: fotos,
      helpers: {
        formatImagePath: (path) => path.startsWith('public/') ? path.replace('public/', '/') : '/public/' + path
      }
    });

  } catch (error) {
    console.error('\n❌ ERROR EN CONSULTA:');
    console.error(error);
    console.error('Stack:', error.stack);
    
    res.status(500).render('error', {
      message: 'Error al cargar las fotos',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

/**
 * @route GET /fotos/findAll/json
 * @description Obtiene todas las fotos en formato JSON
 */
router.get('/findAll/json', async (req, res) => {
  try {
    const fotos = await Foto.findAll({
      attributes: { exclude: ["updatedAt"] }
    });
    res.json(fotos);
  } catch (error) {
    console.error('Error en /findAll/json:', error);
    res.status(500).json({ error: 'Error al obtener fotos' });
  }
});

/**
 * @route GET /fotos/test
 * @description Ruta de prueba para verificar el router
 */
router.get('/test', (req, res) => {
  res.json({ 
    status: 'Router de fotos funcionando',
    modelsLoaded: {
      Foto: !!Foto,
      Etiqueta: !!Etiqueta
    }
  });
});


/**para buscar fotos por id, clase del 22 de julio martes */

/**
 * @route GET /fotos/findById/json/:id
 * @description Obtiene una foto específica en formato JSON
 */
router.get('/findById/json/:id', async (req, res) => {
  try {
    const foto = await Foto.findByPk(req.params.id, {
      attributes: { exclude: ['updatedAt'] },
      include: {
        model: Etiqueta,
        as: 'etiquetas',
        attributes: ['id', 'texto'],
        through: { attributes: [] }
      }
    });

    if (!foto) {
      return res.status(404).json({ message: 'Foto no encontrada' });
    }

    res.json(foto);
  } catch (error) {
    console.error('Error en /findById/json:', error);
    res.status(500).json({ error: 'Error al buscar la foto' });
  }
});

/**
 * @route GET /fotos/findById/view/:id
 * @description Muestra los detalles de una foto en una vista HTML
 */
router.get('/findById/view/:id', async (req, res) => {
  try {
    const foto = await Foto.findByPk(req.params.id, {
      attributes: { exclude: ['updatedAt'] },
      include: {
        model: Etiqueta,
        as: 'etiquetas',
        attributes: ['id', 'texto'],
        through: { attributes: [] }
      }
    });

    if (!foto) {
      return res.status(404).render('error', {
        message: 'Foto no encontrada',
        error: { status: 404 }
      });
    }

    res.render('detalle', {
      title: `Detalle de Foto - ${foto.titulo}`,
      foto: foto
    });
  } catch (error) {
    console.error('Error en /findById/view:', error);
    res.status(500).render('error', {
      message: 'Error al cargar la foto',
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

module.exports = router;