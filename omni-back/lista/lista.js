const express = require('express');
const router = express.Router();
const RegistroServiciosModel = require('../Modelo/RegistroServicios'); // Importa el modelo de Servicios
const TalleresModel = require('../Modelo/Talleres'); //Importando el modelo de talleres

// Ruta para listar servicios
router.get('/servicios', async (req, res) => {
  try {
    // Consulta para obtener todos los servicios
    const servicios = await RegistroServiciosModel.find({});
    // Envía la respuesta al cliente
    res.status(200).json(servicios);
  } catch (error) {
    console.error(error);
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al listar servicios' });
  }
});

// Ruta para listar talleres y servicios
router.get('/talleres', async (req, res) => {
  try {
    // Consulta para obtener todos los servicios
    const talleres = await TalleresModel.find({});
    // Envía la respuesta al cliente
    res.status(200).json(talleres);
  } catch (error) {
    console.error(error);
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al listar talleres' });
  }
});

module.exports = router;