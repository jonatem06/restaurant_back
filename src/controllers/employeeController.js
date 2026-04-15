const Employee = require('../models/Employee');

const createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      Object.assign(employee, req.body);
      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    } else {
      res.status(404);
      throw new Error('Empleado no encontrado');
    }
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'Empleado eliminado' });
    } else {
      res.status(404);
      throw new Error('Empleado no encontrado');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
};
