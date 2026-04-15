const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const productRoutes = require('./routes/productRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const packageRoutes = require('./routes/packageRoutes');
const saleRoutes = require('./routes/saleRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const financeRoutes = require('./routes/financeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/personal', employeeRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/recetas', recipeRoutes);
app.use('/api/menu', menuItemRoutes);
app.use('/api/paquetes', packageRoutes);
app.use('/api/ventas', saleRoutes);
app.use('/api/gastos', expenseRoutes);
app.use('/api/finanzas', financeRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.send('POS Restaurante API corriendo...');
});

app.use(errorHandler);

module.exports = app;
