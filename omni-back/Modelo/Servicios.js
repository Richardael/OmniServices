const mongoose = require('mongoose');

const serviciosSchema = new mongoose.Schema({
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

const ServiciosModel = mongoose.model('Servicios', serviciosSchema);

module.exports = ServiciosModel;
