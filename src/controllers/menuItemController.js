const MenuItem = require('../models/MenuItem');
const Recipe = require('../models/Recipe');

const createMenuItem = async (req, res, next) => {
  try {
    const { nombre, recetaId, precio } = req.body;
    const recipe = await Recipe.findById(recetaId);
    if (!recipe) {
      res.status(404);
      throw new Error('Receta no encontrada');
    }
    const costo = recipe.costoTotal;
    const margen = precio - costo;

    const menuItem = await MenuItem.create({ nombre, recetaId, precio, costo, margen });
    res.status(201).json(menuItem);
  } catch (error) {
    next(error);
  }
};

const getMenuItems = async (req, res, next) => {
  try {
    const items = await MenuItem.find({}).populate('recetaId');
    res.json(items);
  } catch (error) {
    next(error);
  }
};

const updateMenuItem = async (req, res, next) => {
  try {
    const { precio, recetaId } = req.body;
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      res.status(404);
      throw new Error('Item del menú no encontrado');
    }

    if (recetaId) {
      const recipe = await Recipe.findById(recetaId);
      if (recipe) {
        menuItem.recetaId = recetaId;
        menuItem.costo = recipe.costoTotal;
      }
    }

    if (precio !== undefined) {
      menuItem.precio = precio;
    }

    menuItem.margen = menuItem.precio - menuItem.costo;
    if (req.body.nombre) menuItem.nombre = req.body.nombre;

    const updatedItem = await menuItem.save();
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

const deleteMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Item del menú no encontrado');
    }
    res.json({ message: 'Item del menú eliminado' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem };
