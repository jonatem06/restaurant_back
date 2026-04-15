const Employee = require('../models/Employee');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear data
    await Employee.deleteMany({});
    await Product.deleteMany({});

    // Create Gerente
    await Employee.create({
      nombres: 'Admin',
      apellidoPaterno: 'Sistema',
      apellidoMaterno: 'POS',
      rfc: 'ADMIN123456',
      imss: 'IMSS123456',
      telefono: '1234567890',
      correo: 'admin@pos.com',
      username: 'admin',
      password: 'adminpassword',
      diasLaborales: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
      horario: '9:00 - 18:00',
      sueldo: 15000,
      role: 'gerente'
    });

    // Create Initial Products
    await Product.create([
      { nombre: 'Carne Res', precio: 150, tipoUnidad: 'kilo' },
      { nombre: 'Pan Hamburguesa', precio: 5, tipoUnidad: 'pieza' },
      { nombre: 'Jitomate', precio: 20, tipoUnidad: 'kilo' }
    ]);

    console.log('Seeds ejecutados correctamente');
    process.exit();
  } catch (error) {
    console.error('Error en seeds:', error);
    process.exit(1);
  }
};

seed();
