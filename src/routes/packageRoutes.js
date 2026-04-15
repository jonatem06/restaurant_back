const express = require('express');
const { createPackage, getPackages, updatePackage, deletePackage } = require('../controllers/packageController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getPackages)
  .post(authorize('gerente'), createPackage);

router.route('/:id')
  .put(authorize('gerente'), updatePackage)
  .delete(authorize('gerente'), deletePackage);

module.exports = router;
