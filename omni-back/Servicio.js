const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  descripcion_tecnica: String, 
  categoria: String, 
  tipo_servicio: String, 
  tipo_plataforma: String, 
  tarifa: String, 
  pre_requisito: String, 
  disponibilidad: String, 
  costos: {
    type: Number,
    required: true,
  },
  prioridad: String, 
  tiempo_estimado: String, 
});

const Servicio = mongoose.model('Servicio', servicioSchema);

module.exports = Servicio;
