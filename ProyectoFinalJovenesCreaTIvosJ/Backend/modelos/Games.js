const mongoose = require('mongoose');
const GameSchema = mongoose.Schema({

    
    imagen: {
        type: String,required: true
    },
    nombre: {
        type: String, 
        required: true
    },
    genero: {
        type: String, 
        required: true
    },
    precio : {
        type: String,       
        required: true
    },
    descripcion: {
        type: String, 
        required: true  
    },
    fecha: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Game', GameSchema);