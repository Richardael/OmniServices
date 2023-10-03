const express = require('express');
const router = express.Router();
const RegistroServiciosModel = require('../Modelo/RegistroServicios'); // Importa el modelo de Servicios
const TalleresModel = require('../Modelo/Talleres'); //Importando el modelo de talleres
const UsuariosModel = require('../Modelo/Usuarios'); //Importo el modelo de usuarios 

// Ruta para contar documentos por tipo en las colecciones de Servicios, Talleres y Usuarios
router.get('/contador', async (req, res) => {
    try {
      // Contar los servicios por tipo "open"
      const cantidadServiciosOpen = await RegistroServiciosModel.countDocuments({ tipo_plataforma: 'open' });
      // Contar los servicios por tipo "IBM"
      const cantidadServiciosIBM = await RegistroServiciosModel.countDocuments({ tipo_plataforma: 'IBM' });
  
      // Contar los talleres por tipo "open"
      const cantidadTalleresOpen = await TalleresModel.countDocuments({ tipo_plataforma: 'open' });
  
      // Contar los talleres por tipo "IBM"
      const cantidadTalleresIBM = await TalleresModel.countDocuments({ tipo_plataforma: 'IBM' });
  
      // Contar los usuarios
      const cantidadUsuarios = await UsuariosModel.countDocuments();
  
  
      // Devolver los resultados al cliente React en un solo objeto JSON
      res.status(200).json({
        servicios: {
          cantidadOpen: cantidadServiciosOpen,
          cantidadIBM: cantidadServiciosIBM,
        },
        talleres: {
          cantidadOpen: cantidadTalleresOpen,
          cantidadIBM: cantidadTalleresIBM,
        },
        usuarios: {
          cantidadUsuarios: cantidadUsuarios,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al contar los documentos por tipo' });
    }
  });
  
  module.exports = router;