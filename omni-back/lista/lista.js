const express = require('express');
const router = express.Router();
const RegistroServiciosModel = require('../Modelo/RegistroServicios'); // Importa el modelo de Talleres
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

//--------------------FALTA MODIFICAR-------------------------------------
// Ruta para buscar un taller por ID
router.get('/modificar/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID de la URL

    // Busca el taller por ID
    const taller = await TalleresModel.findById(id);

    if (!taller) {
      return res.status(404).json({ message: 'Taller no encontrado' });
    }

    // Responde con los datos del taller encontrado
    res.status(200).json(taller);
  } catch (error) {
    console.error(error);
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al buscar el taller' });
  }
});

// Ruta para eliminar un recurso por ID (puede ser de talleres o servicios)
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID de la URL

    // Intenta buscar el ID en la colección de Talleres
    const taller = await TalleresModel.findByIdAndDelete(id);

    if (taller) {
      // Si se encuentra en Talleres, responde con un mensaje de éxito
      return res.status(200).json({ message: 'Taller eliminado con éxito' });
    }

    // Si no se encuentra en Talleres, busca en la colección de Servicios
    const servicio = await RegistroServiciosModel.findByIdAndDelete(id);

    if (servicio) {
      // Si se encuentra en Servicios, responde con un mensaje de éxito
      return res.status(200).json({ message: 'Servicio eliminado con éxito' });
    }

    // Si no se encuentra en ninguna de las colecciones, responde con un mensaje de error
    res.status(404).json({ message: 'Recurso no encontrado' });
  } catch (error) {
    console.error(error);
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al eliminar el recurso' });
  }
});

module.exports = router;