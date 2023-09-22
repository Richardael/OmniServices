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

module.exports = router;