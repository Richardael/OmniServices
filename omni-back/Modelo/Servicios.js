const mongoose = require('mongoose');

const serviciosSchema = new mongoose.Schema({
  nombre_servicio: {
    type: String,
    required: true,
  },
  fecha_servicio: {
    type: Date,
    default: Date.now
  },
  descripcion_servicio: {
    type: String,
    required: true,
  },
  descripciont_servicio: String, 
  categoria: String, 
  tipo_servicio: String, 
  tipo_plataforma: String, 
  tarifa_servicio: String, 
  pre_requisitos: String, 
  disponibilidad_servicio: String, 
  industria_atendida: String,
  costos_servicio: {
    type: Number,
    required: true,
  },
  prioridad_servicio: String, 
  tiempo_estimado: String, 
});

const ServiciosModel = mongoose.model('registroservicios', serviciosSchema);

module.exports = ServiciosModel;
