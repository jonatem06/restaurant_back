const express = require('express');
const { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } = require('../controllers/menuItemController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getMenuItems)
  .post(authorize('gerente'), createMenuItem);

router.route('/:id')
  .put(authorize('gerente'), updateMenuItem)
  .delete(authorize('gerente'), deleteMenuItem);

module.exports = router;
