const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const UsuariosModel = require('../Modelo/Usuarios');
const crypto = require('crypto');


// Función para obtener un nuevo token de acceso OAuth2
const refreshAccessToken = (accountTransport, callback) => {
  const oauth2Client = new google.auth.OAuth2(
      accountTransport.auth.clientId,
      accountTransport.auth.clientSecret,
      'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
      refresh_token: accountTransport.auth.refreshToken,
      tls: {
          rejectUnauthorized: false
      }
  });
  
  oauth2Client.getAccessToken((err, token) => {
      if (err)
          return console.log(err);
      accountTransport.auth.accessToken = token;
      callback(nodemailer.createTransport(accountTransport));
  });
};

// Ruta para registrar un nuevo servicio
router.post('/registro', async (req, res) => {
  try {
      // Obtén los datos del cuerpo de la solicitud
      const { nombre_us, nombre, apellido, email, password } = req.body;

      // Crea una nueva instancia de servicio
      const newUsuario = new UsuariosModel({
          nombre_us, nombre, apellido, email, password
      });

      // Guarda el servicio en la base de datos
      await newUsuario.save();

      // Configura el transportador de nodemailer con la clave de API
      const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              type: 'OAuth2',
              user: 'omnitetgroup02@gmail.com',
              clientId: '222422112546-retmmnii6840v9lt8sqpj3jjd5abunk9.apps.googleusercontent.com',
              clientSecret: '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',
              refreshToken: '1//04EAQcmTOkW5sCgYIARAAGAQSNwF-L9Irluw_XZdSXa5kd3Dwe-vZ8bgvmWdQOVbWSRpJceS2kq9mdSpf0--wCt4Vlu3qW7xr83w',
          }
      });

      // Configura el correo electrónico de verificación
      const mailOptions = {
          from: 'omnitetgroup02@gmail.com',
          to: email,
          subject: 'Verifica tu correo electrónico',
          text: `Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico: http://192.168.1.50:8000/usuarios/verificar/${newUsuario._id}`,
      };

      // Intenta enviar el correo de verificación
      try {
          const info = await transporter.sendMail(mailOptions);
          console.log('Correo de verificación enviado: ' + info.response);
          // Respuesta exitosa
          res.status(201).json({ message: 'Registro exitoso. Se ha enviado un correo de verificación.' });
          console.log("Registro de Usuario exitoso");
      } catch (authError) {
          // Captura y maneja errores de autenticación
          console.error('Error de autenticación al enviar el correo de verificación:', authError);
          
          // Intenta refrescar el token y enviar el correo nuevamente
          refreshAccessToken(transporter, async (newTransporter) => {
              try {
                  const newInfo = await newTransporter.sendMail(mailOptions);
                  console.log('Correo de verificación enviado después de refrescar el token: ' + newInfo.response);
                  res.status(201).json({ message: 'Registro exitoso. Se ha enviado un correo de verificación.' });
                  console.log("Registro de Usuario exitoso después de refrescar el token");
              } catch (newAuthError) {
                  // Si aún hay un error, devuelve el error original
                  console.error('Error de autenticación al enviar el correo de verificación después de refrescar el token:', newAuthError);
                  res.status(500).json({ error: 'Hubo un error al registrar el Usuario. Verifica la configuración del correo electrónico.' });
              }
          });
      }
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
      res.redirect('http://192.168.1.16:1111/auth/');

  } catch (error) {
      console.error(error);
      // Manejo de errores
      res.status(500).json({ error: 'Hubo un error al verificar el correo electrónico' });
  }
});

// 2. Verificación de correo electrónico
router.post('/recuperar-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Verifica si la dirección de correo existe en la base de datos
    const usuario = await UsuariosModel.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: 'No se encontró una cuenta con esta dirección de correo electrónico' });
    }


        // Genera un token único y temporal
        const token = crypto.randomBytes(20).toString('hex');
        usuario.token_recuperacion = token; // Almacena el token en el usuario
        await usuario.save();
    

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

    // Configura el correo electrónico de recuperación de contraseña
    const mailOptions = {
      from: 'jhoynners.santaella15@gmail.com',
      to: email,
      subject: 'Recuperación de Contraseña',
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://192.168.1.16:1111/auth/olvide-validado/${token}`,
    };

    await transporter.sendMail(mailOptions);

    // Respuesta exitosa
    res.status(200).json({ message: 'Correo de recuperación de contraseña enviado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud de recuperación de contraseña' });
  }
});

// 5. Actualización de Contraseña
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { nuevo_password} = req.body;

  try {
    // Verifica si el token es válido y no ha expirado
    const usuario = await UsuariosModel.findOne({ token_recuperacion: token });

    if (!usuario) {
      return res.status(401).json({ message: 'Token de recuperación de contraseña no válido' });
    }

    // Actualiza la contraseña del usuario en la base de datos
    usuario.password = nuevo_password;
    usuario.token_recuperacion = null; // Limpia el token de recuperación
    await usuario.save();

    // Notifica al usuario que la contraseña se ha cambiado correctamente
    res.status(200).json({ message: 'Contraseña cambiada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud de cambio de contraseña' });
  }
});


module.exports = router;
