const express = require('express');
const router = express.Router();
const AuditoriaModel = require('../Modelo/Auditoria'); //Importo el modelo de auditoria

// Ruta para listar auditoria
router.get('/historial', async (req, res) => {
    try {
      // Consulta para obtener todos los servicios
      const historial = await AuditoriaModel.find({});
      // Envía la respuesta al cliente
      res.status(200).json(historial);
    } catch (error) {
      console.error(error);
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al listar el historial' });
    }
  });

  // Ruta para obtener los últimos 3 registros de auditoria
router.get('/notificacion', async (req, res) => {
  try {
    // Consulta para obtener los últimos 3 registros de auditoria
    const notificacion = await AuditoriaModel.find({})
      .sort({ _id: -1 }) // Ordena por fechaHora en orden descendente (los más recientes primero)
      .limit(3); // Limita la cantidad de resultados a 3
    // Envía la respuesta al cliente
    res.status(200).json(notificacion);
  } catch (error) {
    console.error(error);
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al obtener los últimos registros de auditoria' });
  }
});

module.exports = router;