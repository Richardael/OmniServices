const mongoose = require('mongoose');

const auditoriaSchema = new mongoose.Schema({
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario', // Suponiendo que tienes un modelo de Usuarios
    },
    accion: String, // Aquí puedes registrar la acción realizada
    tipoDocumento: String,
    documentoAfectado: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'tipoDocumento', // Referencia dinámica a la colección (Servicios o Talleres)
    },
    nombreDocumento: String,
    fechaHora: { type: Date, default: Date.now },
    detalles: String,
  });

  const AuditoriaModel = mongoose.model('auditoria', auditoriaSchema);

  module.exports = AuditoriaModel;