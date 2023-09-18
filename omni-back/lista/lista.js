const express = require('express');
const router = express.Router();
const TalleresModel = require('../Modelo/RegistroServicios'); // Importa el modelo de Talleres
const RegistroServiciosModel = require('../Modelo/Talleres'); // Importa el modelo de Servicios

// Ruta para listar talleres y servicios
router.get('/lista', async (req, res) => {
  try {
    // Consulta para obtener todos los talleres
    const talleres = await TalleresModel.find({});

    // Consulta para obtener todos los servicios
    const servicios = await RegistroServiciosModel.find({});

    // Combina los resultados en una respuesta única
    const lista = {
      talleres,
      servicios
    };

    // Envía la respuesta al cliente
    res.status(200).json(lista);
  } catch (error) {
    console.error(error);
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al listar talleres y servicios' });
  }
});

module.exports = router;