const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre_us: String,
    nombre_completo: String,
    correo_us: String,
    password: String,
    id_rol: {
        type: Number,
        default: 5 // Valor predeterminado para id_rol (4 para "vendedor")
    }, 
    verificado: {
        type: Boolean,
        default: false // Valor predeterminado para verificado
    }
});

const UsuariosModel = mongoose.model('usuarios', usuariosSchema);

module.exports = UsuariosModel;