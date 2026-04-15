const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  precio: { type: Number, required: true },
  tipoUnidad: { type: String, enum: ['kilo', 'pieza'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
