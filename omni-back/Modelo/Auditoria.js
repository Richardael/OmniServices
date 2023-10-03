const mongoose = require('mongoose');
const format = require('date-fns/format'); // Importa la función de formateo de fecha de date-fns

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
  fechaHora: {
    type: Date,
    default: Date.now,
    get: function () {
      return format(this.fechaHora, 'dd/MM/yyyy'); // Formato personalizado (dd/MM/yyyy)
    },
  },
  detalles: String,
});

const AuditoriaModel = mongoose.model('auditoria', auditoriaSchema);

module.exports = AuditoriaModel;
