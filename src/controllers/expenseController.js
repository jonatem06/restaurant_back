const Expense = require('../models/Expense');

const createExpense = async (req, res, next) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({});
    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) {
      res.status(404);
      throw new Error('Gasto no encontrado');
    }
    res.json(expense);
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      res.status(404);
      throw new Error('Gasto no encontrado');
    }
    res.json({ message: 'Gasto eliminado' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createExpense, getExpenses, updateExpense, deleteExpense };
