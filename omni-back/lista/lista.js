const express = require('express');
const router = express.Router();
const RegistroServiciosModel = require('../Modelo/RegistroServicios'); // Importa el modelo de Servicios
const TalleresModel = require('../Modelo/Talleres'); //Importando el modelo de talleres
const { ObjectId } = require('mongodb');

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

// Ruta para Eliminar un taller o Servicio por ID usando ObjectId

router.delete('/eliminar/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID de la URL

    //Declarar object id con new

    const idObject = new ObjectId(id);

    // Busca el taller por ID
    const taller = await TalleresModel.findById({_id: ObjectId(id)});
    const servicio = await RegistroServiciosModel.findById({_id: ObjectId(id)});
    if (!taller) {
      return res.status(404).json({ message: 'Taller no encontrado' });
    }
    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    // Elimina el taller
    await taller.remove();
    await servicio.remove();
    // Responde con los datos del taller eliminado
    res.status(200).json({ message: 'Taller eliminado' });
    res.status(200).json({ message: 'Servicio eliminado' });
  } catch (error) {
    console.error(error);
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al eliminar el taller' });
    res.status(500).json({ error: 'Hubo un error al eliminar el servicio' });
  }
}
);

module.exports = router;