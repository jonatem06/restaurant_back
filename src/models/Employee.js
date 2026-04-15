const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidoPaterno: { type: String, required: true },
  apellidoMaterno: { type: String, required: true },
  rfc: { type: String, required: true, unique: true },
  imss: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diasLaborales: [{ type: String, enum: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'] }],
  horario: { type: String, required: true },
  sueldo: { type: Number, required: true },
  role: { type: String, enum: ['vendedor', 'gerente', 'cocina'], default: 'vendedor' }
}, { timestamps: true });

employeeSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

employeeSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Employee', employeeSchema);
