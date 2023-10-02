const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const UsuariosModel = require('../Modelo/Usuarios');

// Ruta para registrar un nuevo servicio
router.post('/registro', async (req, res) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { nombre_us, nombre_completo, correo_us, password } = req.body;

    // Crea una nueva instancia de servicio
    const newUsuario = new UsuariosModel({
      nombre_us, nombre_completo, correo_us, password
    });

    // Guarda el servicio en la base de datos
    await newUsuario.save();

    // Configura el transportador de nodemailer con la clave de API
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: 'jhoynners.santaella15@gmail.com', // Cambia esto por tu dirección de correo
        clientId: '108455970368-045d01o8k2ioi4ajh3vcqjqbasjqev6n.apps.googleusercontent.com', // Cambia esto por tu ID de cliente de OAuth
        clientSecret: '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', // Cambia esto por tu secreto de cliente de OAuth
        refreshToken: '1//04gtOKqw-1HndCgYIARAAGAQSNwF-L9Irwq10gTvMBTG-3mPKxNFNEBQ9uwuzxrE1BNIX-V1jNwAfzRr6Oe3PE7p1tjcLWdyTVmw', // Cambia esto por tu token de actualización de OAuth
      }
    });

    // Configura el correo electrónico de verificación
    const mailOptions = {
      from: 'jhoynners.santaella15@gmail.com', // Cambia esto por tu dirección de correo
      to: correo_us,
      subject: 'Verifica tu correo electrónico',
      text: `Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico: http://192.168.1.43:8000/usuarios/verificar/${newUsuario._id}`,
    };

    // Envía el correo de verificación
    const info = await transporter.sendMail(mailOptions);

    console.log('Correo de verificación enviado: ' + info.response);
    
    // Respuesta exitosa
    res.status(201).json({ message: 'Registro exitoso. Se ha enviado un correo de verificación.' });
    console.log("Registro de Usuario exitoso");
  } catch (error) {
    console.error(error);
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al registrar el Usuario' });
  }
});

// Ruta para verificar el correo electrónico
router.get('/verificar/:id', async (req, res) => {
  try {
      const usuario = await UsuariosModel.findById(req.params.id);

      if (!usuario) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
          console.log("usuario no encontrado")
      }

      // Verifica si el usuario ya está verificado
      if (usuario.verificado) {
          return res.status(200).json({ message: 'El correo ya ha sido verificado previamente' });
      }
      console.log("Usuario verificado correctamente")
      // Marca al usuario como verificado
      usuario.verificado = true;
      await usuario.save();

      // Redirige al usuario a la página de inicio de sesión
      res.redirect('http://192.168.1.43:1111/auth/');

  } catch (error) {
      console.error(error);
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al verificar el correo electrónico' });
  }
});

module.exports = router;
