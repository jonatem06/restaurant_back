const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');
const { productValidator } = require('../utils/validators');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getProducts)
  .post(authorize('gerente'), productValidator, createProduct);

router.route('/:id')
  .put(authorize('gerente'), updateProduct)
  .delete(authorize('gerente'), deleteProduct);

module.exports = router;
