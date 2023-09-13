const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre_us: String,
    nombre_completo: String,
    correo_us: String,
    password: String,
});

const UsuariosModel = mongoose.model('usuarios', usuariosSchema);

module.exports = UsuariosModel;