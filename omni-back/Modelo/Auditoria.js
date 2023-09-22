const mongoose = require('mongoose');

const auditoriaSchema = new mongoose.Schema({
  usuario: {
    type: String,
    ref: 'usuarios', // Suponiendo que tienes un modelo de Usuarios
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
  datosCambiados: {
    type: Object, // Objeto JavaScript para almacenar los cambios
    default: null, // Puedes establecer un valor predeterminado como nulo si no se proporciona
  },
});

  const AuditoriaModel = mongoose.model('auditoria', auditoriaSchema);

  module.exports = AuditoriaModel;