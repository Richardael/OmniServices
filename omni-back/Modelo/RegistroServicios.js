// models/Servicio.js
const mongoose = require('mongoose');

const registroServiciosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  descripcion_tecnica: {
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
  tarifa: {
    type: String,
    required: true,
  },
  pre_requisito: {
    type: String,
    required: true,
  },
  disponibilidad: {
    type: String,
    required: true,
  },
  costos: {
    type: Number,
    required: true,
  },
  prioridad: {
    type: String,
    required: true,
  },
  tiempo_estimado: {
    type: String,
    required: true,
  },
});

const RegistroServiciosModel = mongoose.model('RegistroServicios', registroServiciosSchema);

module.exports = RegistroServiciosModel;
