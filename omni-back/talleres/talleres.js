const express = require('express');
const router = express.Router();
const TalleresModel = require('../Modelo/Talleres'); //Importando el modelo de talleres
const AuditoriaModel = require('../Modelo/Auditoria'); //Importo el modelo de auditoria

router.get('/open', async (req, res) => {
  try {
    // Obtén todos los talleres desde la base de datos
    const talleresOpen = await TalleresModel.find({tipo_plataforma: "Open"});
    console.log("Talleres encontrados:", talleresOpen);
    res.json(talleresOpen);
    console.log("Búsqueda talleres OPEN");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los talleres OPEN' });
  }
});

router.get('/ibm', async (req, res) => {
  try {
    // Obtén todos los talleres desde la base de datos
    const talleresIbm = await TalleresModel.find({tipo_plataforma: "IBM"});
    console.log("Talleres encontrados:", talleresIbm);
    res.json(talleresIbm);
    console.log("Búsqueda talleres IBM");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los talleres IBM' });
  }
});

// Ruta para registrar un nuevo taller
router.post('/registro', async (req, res) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const {
      tipo_plataforma,
      categoria,
      nombre_taller,
      tipo_taller,
      descripcion_taller,
      publico_taller,
      pre_conocimientos,
      temario_taller,
      obj_general,
      duracion_taller,
      modalidad_taller,
      cantidad_participantes,
    } = req.body;

    // Crea una nueva instancia de Taller
    const newTaller = new TalleresModel({
      tipo_plataforma,
      categoria,
      nombre_taller,
      tipo_taller,
      descripcion_taller,
      publico_taller,
      pre_conocimientos,
      temario_taller,
      obj_general,
      duracion_taller,
      modalidad_taller,
      cantidad_participantes
    });

      // Registra una auditoría de registro de servicio
    const usuario = req.body.nombre_us;
    const accion = 'Registro de Servicio';
    const detalles = `Se ha registrado un nuevo taller con nombre: ${nombre_servicio} por el usuario ${usuario}`;
    const tipoDocumento = 'Taller'
    const auditoria = new AuditoriaModel({
      usuario,
      accion,
      detalles,
      tipoDocumento,
      documentoAfectado: newServicio._id, // Aquí asignamos el ID del servicio registrado
      nombreDocumento: nombre_servicio, // Aquí asignamos el nombre del servicio registrado
    });

    await auditoria.save();

    // Guarda el servicio en la base de datos
    await newTaller.save();

    // Respuesta exitosa
    res.status(201).json({ message: 'Taller registrado con éxito' });
    console.log("Registro de taller exitoso");
  } catch (error) {
    console.error(error);
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al registrar el taller' });
  }
});
module.exports = router;