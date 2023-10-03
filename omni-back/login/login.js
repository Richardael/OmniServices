const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UsuariosModel = require('../Modelo/Usuarios');
const config = require('../config');
const jwtSecret = config.jwtSecret;

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { correo_us, password } = req.body;

  // Busca el usuario por correo_us
  const usuario = await UsuariosModel.findOne({ correo_us });

  if (!usuario) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  // Verifica si el usuario ha sido verificado
  if (!usuario.verificado) {
    return res.status(401).json({ message: 'El correo electrónico no ha sido verificado' });
  }

  // Verifica la contraseña (en este ejemplo no se almacena como hash)
  if (password !== usuario.password) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  // En este punto, el inicio de sesión fue exitoso

  // Genera un token JWT
  const token = jwt.sign({ correo_us: usuario.correo_us, rol: usuario.id_rol, usuario: usuario.nombre_us }, jwtSecret);

  // Devuelve el token y el rol como respuesta
  res.status(200).json({ message: 'Inicio de sesión exitoso', token, nombre_us: usuario.nombre_us, id_rol: usuario.id_rol });
});

module.exports = router;
