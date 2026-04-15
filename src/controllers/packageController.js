const Package = require('../models/Package');

const createPackage = async (req, res, next) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json(pkg);
  } catch (error) {
    next(error);
  }
};

const getPackages = async (req, res, next) => {
  try {
    const packages = await Package.find({}).populate('items.menuItemId');
    res.json(packages);
  } catch (error) {
    next(error);
  }
};

const updatePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pkg) {
      res.status(404);
      throw new Error('Paquete no encontrado');
    }
    res.json(pkg);
  } catch (error) {
    next(error);
  }
};

const deletePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      res.status(404);
      throw new Error('Paquete no encontrado');
    }
    res.json({ message: 'Paquete eliminado' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createPackage, getPackages, updatePackage, deletePackage };
