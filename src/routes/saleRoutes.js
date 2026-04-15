const express = require('express');
const { createSale, getSales, updateSaleStatus } = require('../controllers/saleController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');
const { saleValidator } = require('../utils/validators');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getSales)
  .post(authorize('vendedor', 'gerente'), saleValidator, createSale);

router.patch('/:id/status', authorize('cocina', 'gerente'), updateSaleStatus);

module.exports = router;
