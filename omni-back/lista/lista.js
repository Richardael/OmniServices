const express = require('express');
const router = express.Router();
const RegistroServiciosModel = require('../Modelo/RegistroServicios'); // Importa el modelo de Servicios
const TalleresModel = require('../Modelo/Talleres'); //Importando el modelo de talleres
const AuditoriaModel = require('../Modelo/Auditoria'); //Importo el modelo de auditoria
const format = require('date-fns/format'); // Importa la función de formateo de fecha de date-fns

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

router.put('/modificar/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID de la URL
    const taller = await TalleresModel.findById(id); // Intenta buscar en Talleres

    if (taller) {
      // Si se encuentra en Talleres, actualiza los campos de Talleres
      await TalleresModel.findByIdAndUpdate(id, {
        tipo_plataforma: req.body.tipo_plataforma,
        categoria: req.body.categoria,
        nombre_taller: req.body.nombre_taller,
        descripcion_taller: req.body.descripcion_taller,
        publico_taller: req.body.publico_taller,
        pre_conocimientos: req.body.pre_conocimientos,
        temario_taller: req.body.temario_taller,
        obj_general: req.body.obj_general,
        duracion_taller: req.body.duracion_taller,
        modalidad_taller: req.body.modalidad_taller,
        cantidad_participantes: req.body.cantidad_participantes,
      },{ new: true });

      //----------------AUDITORIA TALLERES-------------------------------
        //AUDITORIA MODIFICAR TALLER
          // Registra una auditoría de registro de servicio
          const usuario = req.body.nombre_us;
          const accion = 'Modificación de Taller';
          const detalles = `Se ha modificado un Taller con nombre: ${taller.nombre_taller}`;
          const tipoDocumento = 'Taller'
          const auditoria = new AuditoriaModel({
            usuario,
            accion,
            detalles,
            tipoDocumento,
            documentoAfectado: taller._id,
            nombreDocumento: taller.nombre_taller, 
            fechaHora: fechaHoraFormatted, 
          });

          await auditoria.save();

      //------------FIN AUDITORIA-----------------------------------------------


      return res.status(200).json({ message: 'Taller actualizado con éxito' });
    } else {
      // Si no se encuentra en Talleres, intenta buscar en Servicios
      const servicio = await RegistroServiciosModel.findById(id);

      if (servicio) {
        // Si se encuentra en Servicios, actualiza los campos de Servicios
        await RegistroServiciosModel.findByIdAndUpdate(id, {
          categoria: req.body.categoria,
          nombre_servicio: req.body.nombre_servicio,
          descripcion_servicio: req.body.descripcion_servicio,
          tiempo_estimado: req.body.tiempo_estimado,
          prioridad_servicio: req.body.prioridad_servicio,
          costo_servicio: req.body.costo_servicio,
          pre_requisitos: req.body.pre_requisitos,
          tarifa_servicio: req.body.tarifa_servicio,
          tipo_servicio: req.body.tipo_servicio,
          tipo_plataforma: req.body.tipo_plataforma,
          descripciont_servicio: req.body.descripciont_servicio,
          disponibilidad_servicio: req.body.disponibilidad_servicio,
        },{ new: true });

        //AUDITORIA MODIFICAR SERVICIO
          // Formatea la fecha y hora en el formato deseado "DD/MM/YY:HH/MM/SS"
          const fechaHoraFormatted = format(new Date(), 'dd/MM/yy:HH/mm/ss', { timeZone: 'America/Caracas' });

          
          // Registra una auditoría de registro de servicio
          const usuario = req.body.nombre_us;
          const accion = 'Modificación de servicio';
          const detalles = `Se ha modificado un nuevo servicio con nombre: ${servicio.nombre_servicio}`;
          const tipoDocumento = 'Servicio'
          const auditoria = new AuditoriaModel({
            usuario,
            accion,
            detalles,
            tipoDocumento,
            documentoAfectado: servicio._id, // Aquí asignamos el ID del servicio registrado
            nombreDocumento: servicio.nombre_servicio, // Aquí asignamos el nombre del servicio registrado
            fechaHora: fechaHoraFormatted, // Utiliza la cadena formateada directamente
          });

          await auditoria.save();

        
        
        return res.status(200).json({ message: 'Servicio actualizado con éxito' });
      } else {
        // Si no se encuentra en ninguna de las colecciones, responde con un mensaje de error
        res.status(404).json({ message: 'Recurso no encontrado' });
      }
    }
  } catch (error) {
    console.error(error);
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al actualizar el recurso' });
  }
});



// Ruta para eliminar un recurso por ID (puede ser de talleres o servicios)
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID de la URL

    // Intenta buscar el ID en la colección de Talleres
    const taller = await TalleresModel.findById(id);

    if (taller) {
      // Si se encuentra en Talleres, registra una auditoría de eliminación
      //Obtener usuario del body de la solicitud
      const usuario = req.body.nombre_us;
      const accion = 'Eliminación';
      const tipoDocumento = 'Talleres';
      const documentoAfectado = taller._id;
      const nombreDocumento = taller.nombre_taller;
      const detalles = `Eliminación del Taller ${taller.nombre_taller}`;

      // Crea una nueva instancia de Auditoria y guárdala en la base de datos
      const auditoria = new AuditoriaModel({
        usuario,
        accion,
        tipoDocumento,
        documentoAfectado,
        nombreDocumento,
        detalles,
      });

      await auditoria.save();
      console.log('Auditoría de eliminación registrada con éxito');
      // Elimina el taller
      await TalleresModel.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Taller eliminado con éxito' });
    }

    // Si no se encuentra en Talleres, busca en la colección de Servicios
    const servicio = await RegistroServiciosModel.findById(id);

    if (servicio) {
      // Si se encuentra en Servicios, registra una auditoría de eliminación
      //Obtener usuario del body de la solicitud
      const usuario = req.body.nombre_us;
      const accion = 'Eliminación';
      const tipoDocumento = 'registroservicios';
      const documentoAfectado = servicio._id;
      const nombreDocumento = servicio.nombre_servicio;
      const detalles = `Eliminación del Servicio ${servicio.nombre_servicio}`;

      // Crea una nueva instancia de Auditoria y guárdala en la base de datos
      const auditoria = new AuditoriaModel({
        usuario,
        accion,
        tipoDocumento,
        documentoAfectado,
        nombreDocumento,
        detalles,
      });

      await auditoria.save();
      console.log('Auditoría de eliminación registrada con éxito');
      // Elimina el servicio
      await RegistroServiciosModel.findByIdAndDelete(id);
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