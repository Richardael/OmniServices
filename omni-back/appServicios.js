const express = require('express');
const app = express();
const mongoose = require('mongoose');
const RegistroServiciosModel = require('./Modelo/RegistroServicios'); // Importa el modelo de servicio
const ServiciosModel = require('./Modelo/Servicios'); // Importa el modelo de servicios
const cors = require('cors'); // Importa el módulo 'cors'
// Conexión a la base de datos Omniservices
const uri = "mongodb+srv://desabytes:Melon24@omnicluster.hl7ynvt.mongodb.net/OmniServices?retryWrites=true&w=majority";

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

app.get('/servicios', async (req, res) => {
  try {
    // Obtén todos los servicios desde la base de datos
    const servicios = await ServiciosModel.find();
    res.json(servicios);
    console.log("Bien Hecho");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los servicios' });
  }
});


app.post('/registro', async (req, res) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { categoria,nombre_servicio,descripcion_servicio,tiempo_estimado,prioridad_servicio,costos_servicio,pre_requisitos,tarifa_servicio,tipo_servicio,tipo_plataforma,descripciont_servicio, disponibilidad_servicio, industria_atendida} = req.body;

    // Crea una nueva instancia de usuario
    const newServicio = new RegistroServiciosModel({categoria,nombre_servicio,descripcion_servicio,tiempo_estimado,prioridad_servicio,costos_servicio,pre_requisitos,tarifa_servicio,tipo_servicio,tipo_plataforma,descripciont_servicio, disponibilidad_servicio, industria_atendida});

    // Guarda el usuario en la base de datos
    await newServicio.save();

    // Respuesta exitosa
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    // Manejo de errores
    res.status(500).json({ error: 'Hubo un error al registrar el usuario' });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://192.168.1.50:${PORT}`);
});
