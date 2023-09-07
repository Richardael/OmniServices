const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Servicio = require('./Servicio'); // Importa el modelo de servicio
const cors = require('cors'); // Importa el módulo 'cors'


mongoose.connect('mongodb://localhost/OmniServices', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

app.post('/registro', async (req, res) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { nombre, descripcion, descripcion_tecnica, categoria, tipo_servicio, tipo_plataforma, tarifa, pre_requisito, disponibilidad, costos, prioridad, tiempo_estimado} = req.body;

    // Crea una nueva instancia de usuario
    const newServicio = new Servicio({ nombre, descripcion, descripcion_tecnica, categoria, tipo_servicio, tipo_plataforma, tarifa, pre_requisito, disponibilidad, costos, prioridad, tiempo_estimado});

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
