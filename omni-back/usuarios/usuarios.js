const express = require('express');
const router = express.Router();
const UsuariosModel = require('../Modelo/Usuarios'); // Importa el modelo de servicios

// Ruta para registrar un nuevo servicio
router.post('/registro', async (req, res) => {
    try {
      // Obtén los datos del cuerpo de la solicitud
      const {nombre,username,email,password} = req.body;
  
      // Crea una nueva instancia de servicio
      const newUsuario = new UsuariosModel({
        nombre,username,email,password
      });
  
      // Guarda el servicio en la base de datos
      await newUsuario.save();
  
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
  