const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  recetaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  precio: { type: Number, required: true },
  costo: { type: Number, required: true },
  margen: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
