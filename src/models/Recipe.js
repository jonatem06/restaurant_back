const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  productos: [{
    productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    cantidad: { type: Number, required: true }
  }],
  costoTotal: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
