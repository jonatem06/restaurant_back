const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  items: [{
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    cantidad: { type: Number, required: true }
  }],
  precio: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
