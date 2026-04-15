const express = require('express');
const { createRecipe, getRecipes, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getRecipes)
  .post(authorize('gerente'), createRecipe);

router.route('/:id')
  .put(authorize('gerente'), updateRecipe)
  .delete(authorize('gerente'), deleteRecipe);

module.exports = router;
