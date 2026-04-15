const Recipe = require('../models/Recipe');
const Product = require('../models/Product');

const createRecipe = async (req, res, next) => {
  try {
    const { nombre, productos } = req.body;

    let costoTotal = 0;
    for (const item of productos) {
      const product = await Product.findById(item.productoId);
      if (product) {
        costoTotal += product.precio * item.cantidad;
      }
    }

    const recipe = await Recipe.create({ nombre, productos, costoTotal });
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({}).populate('productos.productoId');
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { nombre, productos } = req.body;
    let costoTotal = 0;
    if (productos) {
      for (const item of productos) {
        const product = await Product.findById(item.productoId);
        if (product) {
          costoTotal += product.precio * item.cantidad;
        }
      }
    }

    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      recipe.nombre = nombre || recipe.nombre;
      if (productos) {
        recipe.productos = productos;
        recipe.costoTotal = costoTotal;
      }
      const updatedRecipe = await recipe.save();
      res.json(updatedRecipe);
    } else {
      res.status(404);
      throw new Error('Receta no encontrada');
    }
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      res.status(404);
      throw new Error('Receta no encontrada');
    }
    res.json({ message: 'Receta eliminada' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createRecipe, getRecipes, updateRecipe, deleteRecipe };
