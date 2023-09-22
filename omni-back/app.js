const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el módulo 'cors'
const talleresRoutes = require('./talleres/talleres'); // Asegúrate de ajustar la ruta al archivo talleres.js
const serviciosRoutes = require('./servicios/servicios'); // Importa la ruta de servicios.js
const usuariosRoutes = require('./usuarios/usuarios'); // Importa la ruta de usuarios.js
const loginRoutes = require('./login/login'); // Importa la ruta de login.js
const listaRoutes = require('./lista/lista'); // Importa la ruta de lista.js
const historialRoutes = require('./historial/historial')

app.use(express.json());
app.use(cors());

// Conexión a la base de datos Omniservices
const uri = "mongodb+srv://jhoysantaella15:Melon24@cluster0.zrpgq2r.mongodb.net/Omniservices?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Aumenta el tiempo de espera a 30 segundos
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error en la conexión a la base de datos:', error);
  });

//Middleware para las rutas de los servicios 
app.use('/servicios', serviciosRoutes);

//Middleware para las rutas de los talleres 
app.use('/talleres', talleresRoutes);

//Middleware para las rutas de los usuarios 
app.use('/usuarios', usuariosRoutes);

//Middleware para las rutas de los usuarios 
app.use('/login', loginRoutes);

//Middleware para las rutas de la lista 
app.use('/lista', listaRoutes);

//Middleware para las rutas del historial 
app.use('/lista', historialRoutes);

//Servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://192.168.1.50:${PORT}`);
});
