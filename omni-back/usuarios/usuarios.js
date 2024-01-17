const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const UsuariosModel = require('../Modelo/Usuarios');
const crypto = require('crypto');
const { generarCodigoRecuperacion } = require('../token'); //importa el codigo en donde se genera el token de 6 digitos
const moment = require('moment');

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
       // Verificar si el correo electrónico ya existe en la colección
       const usuarioExistente = await UsuariosModel.findOne({ email });

       if (usuarioExistente) {
           // Si el correo ya existe, enviar un mensaje indicando que el usuario ya existe
           return res.status(400).json({ error: 'El correo electrónico ya está registrado. Por favor, utiliza otro correo electrónico.' });
       }
      // Obtener la fecha actual en formato ISO y luego formatearla como "dd/mm/yyyy"
      const fechaRegistro = moment().format("DD/MM/YYYY");
  
      // Generar un código de verificación
      const tokenRecuperacion = generarCodigoRecuperacion(6);

      // Crea una nueva instancia de servicio
      const newUsuario = new UsuariosModel({
          nombre_us, nombre, apellido, email, password,
          fecha_registro: fechaRegistro, // Convertir a objeto Date
          token_recuperacion: tokenRecuperacion, // Guardar el código de verificación
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
      const htmlContent = `
      <html>
        <head>
          <style>
            /* Estilos CSS personalizados */
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5; /* Cambio de color de fondo */
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px #f2f2f2;
            }
            h1 {
              font-size: 24px;
              margin-bottom: 10px; /* Espacio adicional después del título */
            }
            .omnitime{
              color: ##FFB366; /* Cambio de color para "OmniTime" */
            }
            p {
              color: #666;
              font-size: 14px; /* Tamaño de fuente reducido para el correo */
            }
            .orange-text {
              color: ##FFB366; /* Color morado para el nombre */
              font-size: 18px; /* Tamaño de fuente más grande para el nombre */
            }
            .token-container {
              background-color: #666;
              color: #fff;
              padding: 10px;
              border-radius: 5px;
              font-size: 18px; /* Tamaño de fuente para el texto en el token */
              margin-top: 10px;
              text-align: center;
            }
            .token {
              font-size: 24px; /* Tamaño de fuente más grande para el token */
              font-weight: bold; /* Texto en negrita para el token */
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Bienvenido a <span class="omnitime">OmniServices</span></h1>
            <p>¡Gracias <span class="orange-text">${nombre}</span> por registrarte en nuestro servicio! Esperamos que disfrutes de nuestra plataforma.</p>
            <p>Su código de verificación es:</p>
            <div class="token-container">
               <span class="token">${tokenRecuperacion}</span>
            </div>
          </div>
        </body>
      </html>
      `;
  
      // Configura el correo electrónico de verificación
      const mailOptions = {
          from: 'omnitetgroup02@gmail.com',
          to: email,
          subject: 'Verifica tu correo electrónico',
          html: htmlContent,
      };


      /*ANTIGUA RUTA PARA LA VERIFICACION DE CORREO
      // Configura el correo electrónico de verificación
      const mailOptions = {
          from: 'omnitetgroup02@gmail.com',
          to: email,
          subject: 'Verifica tu correo electrónico',
          text: `Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico: http://192.168.1.50:8000/usuarios/verificar/${newUsuario._id}`,
      };
*/

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


router.post('/validado', async (req, res) => {
    try {
      const { email, token_recuperacion } = req.body;
  
      // Verificar si el correo electrónico y el código de validación coinciden
      const usuario = await UsuariosModel.findOne({ email });
  
      if (usuario) {
        if (usuario.token_recuperacion === token_recuperacion) {
          // Actualizar el campo "verificado" del usuario a true y borrar el campo "token_recuperacion"
          await UsuariosModel.updateOne(
            { _id: usuario._id },
            {
              $set: {
                verificado: true,
                token_recuperacion: null, // Borra el campo "token_recuperacion"
              },
            }
          );
  
          res.status(200).json({ message: 'Usuario validado correctamente' });
        } else {
          res.status(401).json({ error: 'Código de validación incorrecto' });
        }
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al validar el usuario:', error);
      res.status(500).json({ error: 'Ocurrió un error al validar el usuario' });
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

    // Obtén el valor del campo "nombre" del usuario
    const nombre = usuario.nombre;


      // Generar un código de verificación
      const tokenRecuperacion = generarCodigoRecuperacion(6);
        usuario.token_recuperacion = tokenRecuperacion; // Almacena el token en el usuario
        await usuario.save();
    

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
    const htmlContent = `
    <html>
      <head>
        <style>
          /* Estilos CSS personalizados */
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2; /* Cambio de color de fondo */
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5  ;
            border-radius: 5px;
            box-shadow: 0 0 10px #f2f2f2;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 10px; /* Espacio adicional después del título */
          }
          .omnitime {
            color: #FFB366; /* Cambio de color para "OmniTime" */
          }
          p {
            color: #666;
            font-size: 14px; /* Tamaño de fuente reducido para el correo */
          }
          .purple-text {
            color: #FFB366; /* Color morado para el nombre */
            font-size: 18px; /* Tamaño de fuente más grande para el nombre */
          }
          .token-container {
            background-color: #666;
            color: #fff;
            padding: 10px;
            border-radius: 5px;
            font-size: 18px; /* Tamaño de fuente para el texto en el token */
            margin-top: 10px;
            text-align: center;
          }
          .token {
            font-size: 24px; /* Tamaño de fuente más grande para el token */
            font-weight: bold; /* Texto en negrita para el token */
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Recuperación de Contraseña en <span class="omnitime">OmniServices</span></h1>
          <p>¡Hola <span class="purple-text">${nombre}</span>!</p>
          <p>Has solicitado restablecer tu contraseña en OmniServices. Por favor, sigue las instrucciones a continuación:</p>
          <p>Tu código de verificación es:</p>
          <div class="token-container">
            <span class="token">${tokenRecuperacion}</span>
          </div>
          <p>Por favor haz clic en el siguiente enlace para restablecer tu contraseña:</p>
          <p><a href="https://omniservices.onrender.com/usuarios/reset-password/${tokenRecuperacion}">Restablecer Contraseña</a></p>
        </div>
      </body>
    </html>
  `;
    // Configura el correo electrónico de verificación
    const mailOptions = {
        from: 'omnitetgroup02@gmail.com',
        to: email,
        subject: 'Recuperacion de contraseña',
        html: htmlContent,
    };



    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo de verificación enviado: ' + info.response);
      // Respuesta exitosa
      res.status(201).json({ message: 'Envío de correo exitoso. Se ha enviado un correo de a su email.' });
      console.log("Envío de correo enviado");
  } catch (authError) {
      // Captura y maneja errores de autenticación
      console.error('Error de autenticación al enviar el correo de verificación:', authError);
      
      // Intenta refrescar el token y enviar el correo nuevamente
      refreshAccessToken(transporter, async (newTransporter) => {
          try {
              const newInfo = await newTransporter.sendMail(mailOptions);
              console.log('Correo de verificación enviado después de refrescar el token: ' + newInfo.response);
              res.status(201).json({ message: 'Envío de correo exitoso. Se ha enviado un correo de verificación.' });
              console.log("Enviado de correo exitoso después de refrescar el token");
          } catch (newAuthError) {
              // Si aún hay un error, devuelve el error original
              console.error('Error de autenticación al enviar el correo de verificación después de refrescar el token:', newAuthError);
              res.status(500).json({ error: 'Hubo un error al enviar el correo. Verifica la configuración del correo electrónico.' });
          }
      });
  }
} catch (error) {
  console.error(error);
  // Manejo de errores
  res.status(500).json({ error: 'Hubo un error al Enviar el correo' });
}
});

// 5. Actualización de Contraseña
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { nuevo_password } = req.body;

  try {
      // Verifica si el token es válido y no ha expirado
      const usuario = await UsuariosModel.findOne({ token_recuperacion: token });

      if (!usuario) {
          return res.status(401).json({ message: 'Token de recuperación de contraseña no válido' });
      }

      // Verifica si el usuario está validado
      if (!usuario.validado) {
          return res.status(401).json({ message: 'El usuario no está validado. Debes validar tu correo electrónico antes de cambiar la contraseña.' });
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
