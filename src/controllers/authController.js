const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const employee = await Employee.findOne({ username });

    if (employee && (await employee.comparePassword(password))) {
      res.json({
        _id: employee._id,
        nombres: employee.nombres,
        username: employee.username,
        role: employee.role,
        token: generateToken(employee._id),
      });
    } else {
      res.status(401);
      throw new Error('Usuario o contraseña inválidos');
    }
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.employee._id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404);
      throw new Error('Empleado no encontrado');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { login, getMe };
