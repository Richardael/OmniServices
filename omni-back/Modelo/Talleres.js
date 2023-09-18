const mongoose = require('mongoose');

const talleresSchema = new mongoose.Schema({
    tipo_plataforma: String,
    categoria: String,
    nombre_taller: String,
    tipo_taller: String,
    descripcion_taller: String,
    publico_taller: String,
    pre_conocimientos: String,
    temario_taller: String,
    obj_general: String,
    duracion_taller: Number,
    modalidad_taller: String,
    cantidad_participantes: Number,
    fecha_talleres: {
        type: Date,
        default: Date.now // Configura la fecha actual como valor predeterminado
    }
});

const TalleresModel = mongoose.model('talleres', talleresSchema);

module.exports = TalleresModel;