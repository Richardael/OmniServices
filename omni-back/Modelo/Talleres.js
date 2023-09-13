const mongoose = require('mongoose');

const talleresSchema = new mongoose.Schema({
    categoria: String,
    nombre_taller: String,
    tipo_taller: String,
    descripcion_taller: String,
    publico_taller: String,
    pre_conocimientos: String,
    temario_talleres: String,
    obj_general: String,
    duracion_taller: String,
    modalidad_taller: String,
    cantidad_participantes: String,
});

const TalleresModel = mongoose.model('talleres', talleresSchema);

module.exports = TalleresModel;