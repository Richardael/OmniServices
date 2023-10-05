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
  fechaHora: {
    type: String, 
    default: function () {
      const now = new Date();
      const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}:${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      return formattedDate;
    },
  },
  detalles: String,
});

const AuditoriaModel = mongoose.model('auditoria', auditoriaSchema);

module.exports = AuditoriaModel;
