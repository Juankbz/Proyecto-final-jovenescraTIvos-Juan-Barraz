const mongoose = require('mongoose');

const reseñaSchema = new mongoose.Schema({
    autor: { type: String, required: true },
    comentario: { type: String, required: true },
    puntuacion: { type: Number, min: 1, max: 5, required: true },
    fecha: { type: Date, default: Date.now },
    juegoId: { type: mongoose.Schema.Types.ObjectId, ref: 'games', required: true }
});



module.exports = mongoose.model('reviews', reseñaSchema);
