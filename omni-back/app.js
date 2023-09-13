const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el módulo 'cors'
const talleresRoutes = require('./talleres/talleres'); // Asegúrate de ajustar la ruta al archivo talleres.js
const serviciosRoutes = require('./servicios/servicios'); // Importa la ruta de servicios.js

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
app.use(express.json());
app.use(cors());


app.use('/servicios', serviciosRoutes);


//Middleware para las rutas de los talleres 
app.use('/talleres', talleresRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://172.16.0.76:${PORT}`);
});
