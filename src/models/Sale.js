const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, refPath: 'items.itemType', required: true },
    itemType: { type: String, enum: ['MenuItem', 'Package'], required: true },
    cantidad: { type: Number, required: true },
    precioUnitario: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  vendedorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  estado: { type: String, enum: ['pendiente', 'en_proceso', 'listo', 'entregado'], default: 'pendiente' }
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);
