// models/Servicio.js
const mongoose = require('mongoose');
const registroServiciosSchema = new mongoose.Schema({
  nombre_servicio: {
    type: String,
    required: true,
  },
  descripcion_servicio: {
    type: String,
    required: true,
  },
  descripciont_servicio: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  tipo_servicio: {
    type: String,
    required: true,
  },
  tipo_plataforma: {
    type: String,
    required: true,
  },
  tarifa_servicio: {
    type: String,
    required: true,
  },
  pre_requisitos: {
    type: String,
    required: true,
  },
  disponibilidad_servicio: {
    type: String,
    required: true,
  },
  costos_servicio: {
    type: Number,
    required: true,
  },
  prioridad_servicio: {
    type: String,
    required: true,
  },
  tiempo_estimado: {
    type: String,
    required: true,
  },
  industria_atendida: {
    type: String,
    required:true,
  }
});

const RegistroServiciosModel = mongoose.model('RegistroServicios', registroServiciosSchema);

module.exports = RegistroServiciosModel;
