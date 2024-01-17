const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    nombre_us: String,
    email: String,
    password: String,

    
    id_rol: {
        type: Number,
        default: 5 // Valor predeterminado para id_rol (4 para "vendedor")
    },
    
   
    verificado: {
        type: Boolean,
        default: false // Valor predeterminado para verificado
    },
    token_recuperacion: {
        type: String,
        default: null // Valor predeterminado para tokenRecuperacion (null si no se ha solicitado)
    },
    fecha_registro: {
        type: String,
        require: true,
      },
      rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rol'
      }
});

const UsuariosModel = mongoose.model('usuarios', usuariosSchema);

module.exports = UsuariosModel;