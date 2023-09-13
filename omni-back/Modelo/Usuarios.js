const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre: String,
    username: String,
    email: String,
    password: String,
});

const UsuariosModel = mongoose.model('usuarios', usuariosSchema);

module.exports = UsuariosModel;