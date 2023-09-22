// servicios.js
const express = require('express');
const router = express.Router();
const ServiciosModel = require('../Modelo/Servicios'); // Importa el modelo de servicios
const RegistroServiciosModel = require('../Modelo/RegistroServicios'); // Importa el modelo de registro de servicio

// Rutas para servicios IBM
router.get('/ibm', async (req, res) => {
  try {
    // Obtén todos los servicios IBM desde la base de datos
    const serviciosIBM = await ServiciosModel.find({ tipo_plataforma: "IBM" });
    console.log("Servicios IBM encontrados:", serviciosIBM);
    res.json(serviciosIBM);
    console.log("Búsqueda de servicios IBM");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los servicios IBM' });
  }
});

// Rutas para servicios Open
router.get('/open', async (req, res) => {
  try {
    // Obtén todos los servicios Open desde la base de datos
    const serviciosOpen = await ServiciosModel.find({ tipo_plataforma: "Open" });
    console.log("Servicios Open encontrados:", serviciosOpen);
    res.json(serviciosOpen);
    console.log("Búsqueda de servicios Open");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los servicios Open' });
  }
});

// Ruta para registrar un nuevo servicio
router.post('/registro', async (req, res) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const {
      categoria, nombre_servicio, descripcion_servicio, tiempo_estimado,
      prioridad_servicio, costos_servicio, pre_requisitos, tarifa_servicio,
      tipo_servicio, tipo_plataforma, descripciont_servicio, disponibilidad_servicio, industria_atendida
    } = req.body;

    // Crea una nueva instancia de servicio
    const newServicio = new RegistroServiciosModel({
      categoria, nombre_servicio, descripcion_servicio, tiempo_estimado,
      prioridad_servicio, costos_servicio, pre_requisitos, tarifa_servicio,
      tipo_servicio, tipo_plataforma, descripciont_servicio, disponibilidad_servicio, industria_atendida
    });

    // Guarda el servicio en la base de datos
    await newServicio.save();

    // Registra una auditoría de registro de servicio
    const usuario = req.user.nombre_us; //Usuario logeado
    const accion = 'Registro de Servicio';
    const detalles = `Se ha registrado un nuevo servicio con nombre: ${nombre_servicio}`;

    const auditoria = new AuditoriaModel({
      usuario,
      accion,
      detalles,
      documentoAfectado: newServicio._id, // Aquí asignamos el ID del servicio registrado
      nombreDocumento: nombre_servicio, // Aquí asignamos el nombre del servicio registrado
    });

    await auditoria.save();

    // Respuesta exitosa
    res.status(201).json({ message: 'Servicio registrado con éxito' });
    console.log("Registro de servicio exitoso");
  } catch (error) {
    console.error(error);
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al registrar el servicio' });
  }
});


module.exports = router;
