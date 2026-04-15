const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  categoria: { type: String, default: 'general' }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
